import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';
import { Course } from 'src/app/Models/Course/Course';
import { User } from 'src/app/Models/User/User';
import { Vacancy } from 'src/app/Models/Vacancy/Vacancy';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
                               'Authorization': `Bearer token` })
  }


  getUsersInfoByVacancy(vacancyId: number){
    return this.httpClient.get<User[]>('', this.httpOptions).pipe(
      retry(2)
    )
  }

  getUserNameById(userId: number){
    return this.httpClient.get<string>('', this.httpOptions).pipe(
      retry(2)
    )
  }

  getUserInfoById(userId: number){
    return this.httpClient.get<User>('', this.httpOptions).pipe(
      retry(2)
    )
  }

  getBestVacanciesById(userId: number){
    return this.httpClient.get<Vacancy[]>('', this.httpOptions).pipe(
      retry(2)
    )
  }

  getBestCoursesById(userId: number){
    return this.httpClient.get<Course[]>('', this.httpOptions).pipe(
      retry(2)
    )
  }
}
