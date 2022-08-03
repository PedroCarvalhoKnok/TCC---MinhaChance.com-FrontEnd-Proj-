import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Course } from 'src/app/Models/Course/Course';
import { HandleErrors } from '../Errors/handleError';
//import data from '.../Configs/apiconfig.json'

@Injectable({
  providedIn: 'root'
})
export class CourseService{

  constructor(private httpClient: HttpClient, private handleErr: HandleErrors) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  postCourse(course: Course) {
    return this.httpClient.post<Course>(``, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleErr.handleError)
      )
  }


}

