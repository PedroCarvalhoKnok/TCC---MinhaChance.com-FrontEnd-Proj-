import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';
import { User } from 'src/app/Models/User/User';
import { Vacancy } from 'src/app/Models/Vacancy/Vacancy';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  analyticUrl = `${environment.urlBaseApi}/decisionTree`

  constructor(private httpClient: HttpClient) { }



  getVancanciesUserSkills(candidateId: number) {
    console.log(candidateId);
    return this.httpClient.get<any>(`${this.analyticUrl}/${candidateId}`).pipe(
      retry(2)
    )
  }



}
