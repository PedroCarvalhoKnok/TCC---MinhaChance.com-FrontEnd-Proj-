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

  constructor(private httpClient: HttpClient, private handleErr: HandleErrors) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  postTest(test: Test) {
    return this.httpClient.post<Test>(``, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleErr.handleError)
      )
  }
}
