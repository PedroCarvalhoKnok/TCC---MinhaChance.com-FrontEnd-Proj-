import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Vacancy } from 'src/app/Models/Vacancy/Vacancy';
import { Benefit } from 'src/app/Models/Vacancy/Benefit';
import { Requirement } from 'src/app/Models/Vacancy/Requirement';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VacancyService {

  urlVaga = `${environment.urlBaseApi}/vagas`;

  constructor(private httpClient: HttpClient) { }

  postVacancy(vacancy: Vacancy) {
    return this.httpClient.post<any>(this.urlVaga, {
      "idEmpresas": vacancy.userId,
      "titulo": vacancy.vacancyTitle,
      "quantidade": vacancy.quantity,
      "descricao": vacancy.description,
      "beneficios": vacancy.benefit?.description
    })
      .pipe(
        retry(2),
      )
  }

  getVacancy(vacancyId: number) {
    console.log(vacancyId);
    return this.httpClient.get<any>(`${this.urlVaga}/${vacancyId}`)
      .pipe(
        retry(2),
      )
  }

  getVacanciesForCandidates() {
    return this.httpClient.get<any>(`${this.urlVaga}`)
      .pipe(
        retry(2),
      )
  }

  getVacanciesByUser(userId: number) {
    console.log(userId);
    return this.httpClient.get<any>(`${this.urlVaga}/${userId}`)
      .pipe(
        retry(2),
      )
  }

  editVacancy(vacancy: Vacancy) {
    console.log(vacancy)
    return this.httpClient.put<any>(`${this.urlVaga}/${vacancy.id}`, {
      "idEmpresas": vacancy.userId,
      "titulo": vacancy.vacancyTitle,
      "quantidade": vacancy.quantity,
      "descricao": vacancy.description,
      "beneficios": vacancy.benefit?.description
    })
      .pipe(
        retry(2),
      )
  }

  deleteVacancy(vacancyId: number) {
    return this.httpClient.delete<any>(`${this.urlVaga}/${vacancyId}`)
      .pipe(
        retry(2),
      )
  }

  getAllVacanciesByUser(userId: number) {
    return this.httpClient.get<Vacancy[]>(``)
      .pipe(
        retry(2),
      )
  }

  getActiveVacanciesByUser(userId: number) {
    return this.httpClient.get<Vacancy[]>(``)
      .pipe(
        retry(2),
      )
  }

  getCategories() {
    return this.httpClient.get<string[]>(``)
      .pipe(
        retry(2),
      )
  }

  getBenefitsByUser(userId: number) {
    return this.httpClient.get<string[]>(``)
      .pipe(
        retry(2),
      )
  }

  getRequerimentsByUser(userId: number) {
    return this.httpClient.get<string[]>(``)
      .pipe(
        retry(2),
      )
  }

  getLocationsByUser(userId: number) {
    return this.httpClient.get<string[]>(``)
      .pipe(
        retry(2),
      )
  }

  deleteVacancyRequirement(itemId: number) {
    return this.httpClient.get<string>(``)
      .pipe(
        retry(2),
      )
  }

  deleteVacancyBenefit(itemId: number) {
    return this.httpClient.get<string>(``)
      .pipe(
        retry(2),
      )
  }


}
