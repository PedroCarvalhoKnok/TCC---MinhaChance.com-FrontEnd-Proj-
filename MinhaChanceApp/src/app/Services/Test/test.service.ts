import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@azure/storage-blob';
import { Test } from 'src/app/Models/Test/Test';
import { HandleErrors } from '../Errors/handleError';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
                               'Authorization': `Bearer token` })
  }

  postTest(test: Test) {
    return this.httpClient.post<number>(``, this.httpOptions)
      .pipe(
        retry(2),
      )
  }

  getTestByCourseId(courseId: number) {
    return this.httpClient.post<Test>(``, this.httpOptions)
      .pipe(
        retry(2),
      )
  }

  editTest(test: Test) {
    return this.httpClient.put<Test>(``, this.httpOptions)
      .pipe(
        retry(2),
        
      )
  }
}
