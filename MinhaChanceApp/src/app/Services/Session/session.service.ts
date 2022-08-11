import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from 'src/app/Models/Course/Course';
import { HandleErrors } from '../Errors/handleError';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Session } from 'src/app/Models/Course/Session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
                               'Authorization': `Bearer token` })
  }

  postSession(session: Session) {
    return this.httpClient.post<number>(``, this.httpOptions)
      .pipe(
        retry(2),
       
      )
  }

  getSessionsByCourseId(courseId: number) {
    return this.httpClient.post<Session[]>(``, this.httpOptions)
      .pipe(
        retry(2),
       
      )
  }

  editSession(session: Session) {
    return this.httpClient.put<Session>(``, this.httpOptions)
      .pipe(
        retry(2),
        
      )
  }

  deleteSession(sessionId: number) {
    return this.httpClient.delete<boolean>(``, this.httpOptions)
      .pipe(
        retry(2),
        
      )
  }
  
}
