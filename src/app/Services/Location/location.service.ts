import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LocationService {
  

  urlViaCep = `${environment.urlBaseViaCepApi}`;
  urlIbge = `${environment.urlBaseTerritorio}`


  constructor(private httpClient: HttpClient) { }


  getLocationStates(){

    return this.httpClient.get<any>(`${this.urlIbge}/estados`).pipe(
      retry(2)
    )

  }


  getLocationCountiesByState(stateId: number){

    return this.httpClient.get<any>(`${this.urlIbge}/estados/${stateId}/municipios`).pipe(
      retry(2)
    )

  }

  getAddressByZipCode(zipCode: string){

    console.log(this.urlViaCep)

    return this.httpClient.get<any>(`${this.urlViaCep}/${zipCode}/json`,).pipe(
      retry(2)
    )

  }
}
