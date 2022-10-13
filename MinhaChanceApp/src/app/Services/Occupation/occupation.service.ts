import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Occupation } from 'src/app/Models/User/Occupation';

@Injectable({
  providedIn: 'root'
})
export class OccupationService {

  urlOccupation = `${environment.urlBaseApi}/profissao`;

  constructor(private httpClient: HttpClient) { }


  postOccupation() {

    return this.httpClient.post<boolean>(this.urlOccupation, {
      "descricao": "professor"
    }).pipe(
      retry(2)
    )

  }

  getOccupationById(occupationId: number) {

    return this.httpClient.get<Occupation>(this.urlOccupation).pipe(
      retry(2)
    )

  }
}
