import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';
import { User } from 'src/app/Models/User/User';

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
}
