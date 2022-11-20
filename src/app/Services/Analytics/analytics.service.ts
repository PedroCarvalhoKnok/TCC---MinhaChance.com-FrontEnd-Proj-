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

  analyticUrl = `${environment.urlBaseApi}/IMreturn`

  constructor(private httpClient: HttpClient) { }



  getVancancyUserSkills(vacancy: Vacancy, candidate: User){
    return this.httpClient.get<any>(`${this.analyticUrl}`).pipe(
      retry(2)
    )
  }



}
