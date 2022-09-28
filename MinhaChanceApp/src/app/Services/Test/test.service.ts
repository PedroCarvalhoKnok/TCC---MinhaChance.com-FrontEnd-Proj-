import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleErrors } from '../Errors/handleError';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Question } from 'src/app/Models/Test/Question';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer token`
    })
  }

  sendTest(userAnswers: any[]) {
    return this.httpClient.post<boolean>(``, this.httpOptions)
      .pipe(
        retry(2),
      )
  }

  changeTest(userAnswers: any[]) {
    return this.httpClient.put<boolean>(``, this.httpOptions)
      .pipe(
        retry(2),
      )
  }

  getQuestions() {
    return this.httpClient.get<Question[]>(``, this.httpOptions)
      .pipe(
        retry(2),
      )
  }

  getUserTestResults(userId: number) {
    return this.httpClient.get<any[]>(``, this.httpOptions)
      .pipe(
        retry(2),
      )
  }

  getTestByUserId(userId: number) {
    return this.httpClient.get<any>(``, this.httpOptions)
      .pipe(
        retry(2),
      )
  }
}
