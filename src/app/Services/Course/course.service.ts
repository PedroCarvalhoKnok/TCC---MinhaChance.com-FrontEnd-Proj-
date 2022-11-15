import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Course } from 'src/app/Models/Course/Course';
import { HandleErrors } from '../Errors/handleError';
import { courseFilter } from 'src/app/Models/Filters/Course/courseFilter';
//import data from '.../Configs/apiconfig.json'

@Injectable({
  providedIn: 'root'
})
export class CourseService{

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                'Authorization': `Bearer token`})
  }

  postCourse(course: Course) {
    return this.httpClient.post<boolean>(``, this.httpOptions)
      .pipe(
        retry(2),
        
      )
  }

  editCourse(course: Course) {
    return this.httpClient.put<Course>(``, this.httpOptions)
      .pipe(
        retry(2),
        
      )
  }

  deleteCourse(courseId: number) {
    return this.httpClient.delete<boolean>(``, this.httpOptions)
      .pipe(
        retry(2),
        
      )
  }

  
  getAllCoursesById(userId: number, filters: courseFilter | undefined) {
    return this.httpClient.get<Course[]>(``, this.httpOptions)
      .pipe(
        retry(2),
        
      )
  }

  getCourseById(courseId: number) {
    return this.httpClient.get<Course>(``, this.httpOptions)
      .pipe(
        retry(2),
        
      )
  }

  


}

