import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';
import { Course } from 'src/app/Models/Course/Course';
import { User } from 'src/app/Models/User/User';
import { Vacancy } from 'src/app/Models/Vacancy/Vacancy';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlCandidate = `${environment.urlBaseApi}/candidatos`;
  urlCompany = `${environment.urlBaseApi}/empresas`;

  constructor(private httpClient: HttpClient) { }


  getUsersByVacancy(vacancyId: number) {
    return this.httpClient.get<User[]>('',).pipe(
      retry(2)
    )
  }

  getUserInfoByVacancy(userId: number, vacancyId: number) {
    return this.httpClient.get<User>('',).pipe(
      retry(2)
    )
  }

  getUserNameById(userId: number) {
    return this.httpClient.get<string>('',).pipe(
      retry(2)
    )
  }

  getUserInfoById(userId: number) {
    return this.httpClient.get<User>('',).pipe(
      retry(2)
    )
  }

  getBestVacanciesById(userId: number) {
    return this.httpClient.get<Vacancy[]>('',).pipe(
      retry(2)
    )
  }

  getBestCoursesById(userId: number) {
    return this.httpClient.get<Course[]>('').pipe(
      retry(2)
    )
  }

  sendEmail(user: User, bodyMessage: string) {
    return this.httpClient.get<boolean>('').pipe(
      retry(2)
    )
  }

  postUserCandidature(userId: number, vacancyid: number) {
    return this.httpClient.get<boolean>('').pipe(
      retry(2)
    )
  }

  postAffirmativeFeedBack(userId: number, vacancyId: number) {
    return this.httpClient.get<boolean>('').pipe(
      retry(2)
    )
  }

  postCandidateRegister(user: User) {

    console.log(user);
    return this.httpClient.post<any>(this.urlCandidate, {
      "nome": user.userName,
      "cpf": user.cpf,
      "dataNascimento": user.birthDate,
      "idSituacaoEmpregaticia": user.isWorking ? 1 : 2,
      "dataCadastro": user.creationDate,
      "idEscolaridade": user.schoolingId,
      "idProfissao": 1
    }).pipe(
      retry(2)
    )
  }

  postCompanyRegister(user: User) {
    return this.httpClient.post<User>(this.urlCompany, {
      "nomeFantasia": user.userName,
      "razaoSocial": user.profile,
      "cnpj": user.cnpj,
      "ramoAtuacao": "todos",
      "porte": "grande"
    }).pipe(
      retry(2)
    )
  }

  editCandidate(user: User) {
    return this.httpClient.put<boolean>(this.urlCandidate, {
      "nome": user.userName,
      "cpf": user.cpf,
      "dataNascimento": user.birthDate,
      "idSituacaoEmpregaticia": user.isWorking ? 1 : 2,
      "dataCadastro": "2022/10/05",
      "idEscolaridade": user.schoolingId,
      "idProfissao": 1
    }).pipe(
      retry(2)
    )
  }

  editCompany(user: User) {
    return this.httpClient.put<boolean>(this.urlCompany, {
      "nomeFantasia": user.userName,
      "razaoSocial": user.profile,
      "cnpj": user.cnpj,
      "ramoAtuacao": "todos",
      "porte": "grande"
    }).pipe(
      retry(2)
    )
  }
}
