import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Schooling } from 'src/app/Models/User/Schooling';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SchoolingService {

  urlSchooling = `${environment.urlBaseApi}/escolaridade`;

  constructor(private httpClient: HttpClient) { }


  getSchoolings() {

    return this.httpClient.get<Schooling[]>(this.urlSchooling).pipe(
      retry(2),
      catchError(this.handleError)
    )

  }


  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error["Error"]}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }



}
