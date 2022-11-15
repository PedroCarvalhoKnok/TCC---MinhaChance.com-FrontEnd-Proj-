import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';
import { User } from 'src/app/Models/User/User';
import { Vacancy } from 'src/app/Models/Vacancy/Vacancy';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private httpClient: HttpClient) { }



  getVancancyUserSkills(vacancy: Vacancy, candidates: User[]){
    return this.httpClient.get<User[]>('').pipe(
      retry(2)
    )
  }


  
}
