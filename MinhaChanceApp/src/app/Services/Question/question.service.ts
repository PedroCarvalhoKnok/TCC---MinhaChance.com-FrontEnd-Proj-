import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@azure/storage-blob';
import { Course } from 'src/app/Models/Course/Course';
import { HandleErrors } from '../Errors/handleError';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Question } from 'src/app/Models/Question/Question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private httpClient: HttpClient, private handleErr: HandleErrors) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  postQuestion(question: Question) {
    return this.httpClient.post<Question>(``, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleErr.handleError)
      )
  }
}
