import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from 'src/app/Models/Course/Course';
import { HandleErrors } from '../Errors/handleError';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Question } from 'src/app/Models/Question/Question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                'Authorization': `Bearer token` })
  }

  postQuestion(question: Question) {
    return this.httpClient.post<Question>(``, this.httpOptions)
      .pipe(
        retry(2),
        
      )
  }

  getQuestionsByTestId(testId: number) {
    return this.httpClient.get<Question[]>(``, this.httpOptions)
      .pipe(
        retry(2),
        
      )
  }

  editQuestion(question: Question) {
    return this.httpClient.put<Question>(``, this.httpOptions)
      .pipe(
        retry(2),
        
      )
  }
}
