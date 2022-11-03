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
  urlVacancyUser = `${environment.urlBaseApi}/candidatoVaga`;
  urlCandidatesPerVacancy = `${environment.urlBaseApi}/CandidatosPorVaga`;
  urlVacancyPerCandidate = `${environment.urlBaseApi}/vagasPorCandidato`;
  urlViaCep = `${environment.urlBaseViaCepApi}`;

  constructor(private httpClient: HttpClient) { }


  getCandidatesByVacancy(vacancyId: number) {
    return this.httpClient.get<any>(`${this.urlCandidatesPerVacancy}/${vacancyId}`,).pipe(
      retry(2)
    )
  }

  getVacanciesByCandidate(candidateId: number){

    return this.httpClient.get<any>(`${this.urlVacancyPerCandidate}/${candidateId}`,).pipe(
      retry(2)
    )

  }

  getAddressByZipCode(zipCode: string){

    return this.httpClient.get<any>(`${this.urlViaCep}/${zipCode}/json`,).pipe(
      retry(2)
    )

  }

  getUserInfoByVacancy(userId: number, vacancyId: number) {
    return this.httpClient.get<any>('',).pipe(
      retry(2)
    )
  }

  getUserNameById(userId: number) {
    return this.httpClient.get<string>('',).pipe(
      retry(2)
    )
  }

  getCandidateInfoById(userId: number) {

    return this.httpClient.get<any>(this.urlCandidate + `/${userId}`,).pipe(
      retry(2)
    )
  }

  getCompanyInfoById(userId: number) {
    return this.httpClient.get<any>(this.urlCompany + `/${userId}`,).pipe(
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

  postUserCandidature(userId: number, vacancyid: number, candidatureDate: string) {
    return this.httpClient.post<any>(this.urlVacancyUser, {
      "idCandidato": userId,
      "idVaga": vacancyid,
      "dataCandidatura": candidatureDate,
      "status": "em andamento"
    }).pipe(
      retry(2)
    )
  }

  postAffirmativeFeedBack(candidateVacancyId: number, candidateId: number, vacancyId: number) {
    console.log(vacancyId)
    console.log(candidateId)
    console.log(candidateVacancyId)
    return this.httpClient.put<any>(this.urlVacancyUser + `/${candidateVacancyId}`, {
      "idCandidato": candidateId,
      "idVaga": vacancyId,
      "dataCandidatura": "2022/10/05",
      "status": "aprovado"
    }).pipe(
      retry(2)
    )
  }

  postNegativeFeedBack(candidateVacancyId: number, candidateId: number, vacancyId: number) {
    return this.httpClient.put<any>(this.urlVacancyUser + `/${candidateVacancyId}`, {
      "idCandidato": candidateId,
      "idVaga": vacancyId,
      "dataCandidatura": "2022/10/05",
      "status": "desaprovado"
    }).pipe(
      retry(2)
    )
  }

  finishVacancy(vacancyId: number) {
    console.log(vacancyId)
    return this.httpClient.put<any>(`${this.urlVacancyUser}/${vacancyId}`, {
      "idVaga": vacancyId,
      "status": "preenchida"
    })
      .pipe(
        retry(2),
      )
  }

  postCandidateRegister(user: User) {

    console.log(user);
    return this.httpClient.post<any>(this.urlCandidate, {
      "nome": user.userName,
      "cpf": user.cpf,
      "dataNascimento": user.birthDate,
      "idSituacaoEmpregaticia": user.situationId,
      "dataCadastro": user.creationDate,
      "idEscolaridade": user.schoolingId,
      "senha": user.passWord,
      "idProfissao": 1
    }).pipe(
      retry(2)
    )
  }

  postCompanyRegister(user: User) {
    console.log(this.urlCompany);
    return this.httpClient.post<any>(this.urlCompany, {
      "nomeFantasia": user.userName,
      "razaoSocial": user.profile,
      "cnpj": user.cnpj,
      "senha": user.passWord,
      "ramoAtuacao": user.companyArea,
      "porte": user.companyPort
    }).pipe(
      retry(2)
    )
  }

  editCandidate(user: User) {
    return this.httpClient.put<any>(this.urlCandidate + `/${user.id}`, {
      "nome": user.userName,
      "cpf": user.cpf,
      "senha": user.passWord,
      "dataNascimento": user.birthDate,
      "idSituacaoEmpregaticia": user.situationId,
      "dataCadastro": user.creationDate,
      "idEscolaridade": user.schoolingId,
      "idProfissao": 1
    }).pipe(
      retry(2)
    )
  }

  editCompany(user: User) {
    console.log(user);
    return this.httpClient.put<any>(this.urlCompany + `/${user.id}`, {
      "nomeFantasia": user.userName,
      "razaoSocial": user.profile,
      "senha": user.passWord,
      "cnpj": user.cnpj,
      "ramoAtuacao": user.companyArea,
      "porte": user.companyPort
    }).pipe(
      retry(2)
    )
  }
}
