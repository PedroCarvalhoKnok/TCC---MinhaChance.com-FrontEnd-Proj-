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

  getAllVacanciesByUser(userId: number){
    return this.httpClient.post<Vacancy[]>(``, this.httpOptions)
      .pipe(
        retry(2),
      )
  }

  getActiveVacanciesByUser(userId: number){
    return this.httpClient.post<Vacancy[]>(``, this.httpOptions)
      .pipe(
        retry(2),
      )
  }

  getCategoriesByUser(userId: number){
    return this.httpClient.post<string[]>(``, this.httpOptions)
      .pipe(
        retry(2),
      )
  }

  getBenefitsByUser(userId: number){
    return this.httpClient.post<any[]>(``, this.httpOptions)
      .pipe(
        retry(2),
      )
  }

  getRequerimentsByUser(userId: number){
    return this.httpClient.post<any[]>(``, this.httpOptions)
      .pipe(
        retry(2),
      )
  }

  getLocationsByUser(userId: number){
    return this.httpClient.post<any[]>(``, this.httpOptions)
      .pipe(
        retry(2),
      )
  }
}
