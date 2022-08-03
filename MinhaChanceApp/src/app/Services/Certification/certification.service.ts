import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@azure/storage-blob';
import { HandleErrors } from '../Errors/handleError';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Certification } from 'src/app/Models/Certification/Certification';

@Injectable({
  providedIn: 'root'
})
export class CertificationService {

  constructor(private httpClient: HttpClient, private handleErr: HandleErrors) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  postCertification(certification: Certification) {
    return this.httpClient.post<Certification>(``, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleErr.handleError)
      )
  }
}
