import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Vacancy } from 'src/app/Models/Vacancy/Vacancy';

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

  getCategoriesByUser(userId: number){
    return this.httpClient.get<string[]>(``, this.httpOptions)
      .pipe(
        retry(2),
      )
  }

  getBenefitsByUser(userId: number){
    return this.httpClient.get<any[]>(``, this.httpOptions)
      .pipe(
        retry(2),
      )
  }

  getRequerimentsByUser(userId: number){
    return this.httpClient.get<any[]>(``, this.httpOptions)
      .pipe(
        retry(2),
      )
  }

  getLocationsByUser(userId: number){
    return this.httpClient.get<any[]>(``, this.httpOptions)
      .pipe(
        retry(2),
      )
  }

  deleteVacancyItem(itemId: number){
    return this.httpClient.get<string>(``, this.httpOptions)
    .pipe(
      retry(2),
    )
  }
}
