import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Vacancy } from 'src/app/Models/Vacancy/Vacancy';
import { Benefit } from 'src/app/Models/Vacancy/Benefit';
import { Requirement } from 'src/app/Models/Vacancy/Requirement';

@Injectable({
  providedIn: 'root'
})
export class VacancyService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
                               'Authorization': `Bearer token` })
  }

  postVacancy(vacancy: Vacancy){
    return this.httpClient.post<string>(``, this.httpOptions)
    .pipe(
      retry(2),
    )
  }

  getVacancy(vacancyId: number){
    return this.httpClient.get<Vacancy>(``, this.httpOptions)
    .pipe(
      retry(2),
    )
  }

  editVacancy(vacancy: Vacancy){
    return this.httpClient.get<string>(``, this.httpOptions)
    .pipe(
      retry(2),
    )
  }

  deleteVacancy(vacancyId: number){
    return this.httpClient.delete<string>(``, this.httpOptions)
    .pipe(
      retry(2),
    )
  }

  getAllVacanciesByUser(userId: number){
    return this.httpClient.get<Vacancy[]>(``, this.httpOptions)
      .pipe(
        retry(2),
      )
  }

  getActiveVacanciesByUser(userId: number){
    return this.httpClient.get<Vacancy[]>(``, this.httpOptions)
      .pipe(
        retry(2),
      )
  }

  getCategories(){
    return this.httpClient.get<string[]>(``, this.httpOptions)
      .pipe(
        retry(2),
      )
  }

  getBenefitsByUser(userId: number){
    return this.httpClient.get<string[]>(``, this.httpOptions)
      .pipe(
        retry(2),
      )
  }

  getRequerimentsByUser(userId: number){
    return this.httpClient.get<string[]>(``, this.httpOptions)
      .pipe(
        retry(2),
      )
  }

  getLocationsByUser(userId: number){
    return this.httpClient.get<string[]>(``, this.httpOptions)
      .pipe(
        retry(2),
      )
  }

  deleteVacancyRequirement(itemId: number){
    return this.httpClient.get<string>(``, this.httpOptions)
    .pipe(
      retry(2),
    )
  }

  deleteVacancyBenefit(itemId: number){
    return this.httpClient.get<string>(``, this.httpOptions)
    .pipe(
      retry(2),
    )
  }

  
}
