import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';
import { Role } from '../Enums/role';
import { User } from '../Models/User/User';

// const users = [
//     { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Candidate },
//     { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.Company }
// ];

const users = [{
    id: 1,
    userName: 'Daniel Silva',
    profile: 'Candidato',
    passWord: 'abc',
    email: 'daniel.teste123@teste.com',
    isWorking: true,
    actualCompany: 'Empresa Y',
    actualCharge: 'Estagiario',
    address: { streetName: 'rua dos testes', district: 'bairro teste', country: 'Brasil', zipCode: '09060110', streetNumber: 20 },
    age: 20,
    phone: '(11) 94567-2834',
    hasVacancyCourse: false,
    salaryPretension: 2000.00,
    experiences: [],
    certifications: [],
    graduations: [],
    objective: 'Crescimento pessoal e profisional ganhando experiencia',
    userVacancyInfo: { yes: 56, no: 44 },
    userInteligenciesInfo: { intelligence: 'Linguística', vacancies: ['Tradutor e conhecimento em libras'], skills: [67] },
    interests: ['Esportes', 'Idiomas', 'Música'],
    role: Role.Candidate
  },
  {
    id: 2,
    userName: 'Bruna Oliveira',
    profile: 'Candidato',
    passWord: 'abc',
    email: 'bruhh@teste.com',
    isWorking: false,
    address: { streetName: 'rua general teste', district: 'bairro abc', country: 'Brasil', zipCode: '09063410', streetNumber: 208 },
    age: 20,
    phone: '(11) 95566-2939',
    hasVacancyCourse: true,
    salaryPretension: 1000.00,
    experiences: [],
    certifications: [{ id: 1, certificationDescription: 'certificação introdução python', platform: 'MinhaVez!', timeSpent: 10 }],
    graduations: [],
    objective: 'Crescimento pessoal e profisional ganhando experiencia',
    userVacancyInfo: { yes: 50, no: 50 },
    userInteligenciesInfo: { intelligence: 'Lógica-Matemática', vacancies: ['Estatistico - Iniciante analise de dados', 'Desenvolvedor Java júnior'], skills: [78, 75] },
    interests: ['Natação', 'Animes', 'Programação'],
    role: Role.Candidate
  }]



@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return handleRoute();        

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }

        }

        // route functions

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.userName === username && x.passWord === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.id,
                username: user.userName,
                role: user.role,
                token: `fake-jwt-token.${user.id}`
            });
        }

        function getUsers() {
            if (!isCandidate()) return unauthorized();
            return ok(users);
        }

        function getUserById() {
            if (!isLoggedIn()) return unauthorized();

            // only admins can access other user records
            if (!isCandidate() && currentUser()?.id !== idFromUrl()) return unauthorized();

            const user = users.find(x => x.id === idFromUrl());
            return ok(user);
        }

        // helper functions

        function ok(body) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500)); // delay observable to simulate server api call
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'unauthorized' } })
                .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
        }

        function error(message) {
            return throwError({ status: 400, error: { message } })
                .pipe(materialize(), delay(500), dematerialize());
        }

        function isLoggedIn() {
            const authHeader = headers.get('Authorization') || '';
            return authHeader.startsWith('Bearer fake-jwt-token');
        }

        function isCandidate() {
            return isLoggedIn() && currentUser()?.role === Role.Candidate;
        }

        function currentUser() {
            if (!isLoggedIn()) return;
            const id = parseInt(headers.get('Authorization')!.split('.')[1]);
            return users.find(x => x.id === id);
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};