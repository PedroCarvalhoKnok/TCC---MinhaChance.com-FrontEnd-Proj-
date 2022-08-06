import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleErrors } from '../Errors/handleError';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Certification } from 'src/app/Models/Certification/Certification';

@Injectable({
  providedIn: 'root'
})
export class CertificationService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                'Authorization': `Bearer token`})
  }

  postCertification(certification: Certification) {
    
    return this.httpClient.post<number>(``, this.httpOptions)
      .pipe(
        retry(2),
        
      )
  }

  getCertificationByCourseId(courseId: number) {
    
    return this.httpClient.get<Certification>(``, this.httpOptions)
      .pipe(
        retry(2),
        
      )
  }

  editCertification(certification: Certification) {
    return this.httpClient.put<Certification>(``, this.httpOptions)
      .pipe(
        retry(2),
        
      )
  }

  deleteCertification(certificationId: number) {
    return this.httpClient.delete<boolean>(``, this.httpOptions)
      .pipe(
        retry(2),
        
      )
  }

  

  
}
