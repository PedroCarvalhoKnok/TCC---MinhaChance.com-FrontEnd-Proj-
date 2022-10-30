import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SituationService {

  urlSituation = `${environment.urlBaseApi}/situacaoEmpregaticia`;

  constructor(private httpClient: HttpClient) { }

  getSituations() {

    return this.httpClient.get<any>(this.urlSituation).pipe(
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
