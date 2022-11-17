import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';
import { User } from 'src/app/Models/User/User';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LocationService {


  urlViaCep = `${environment.urlBaseViaCepApi}`;
  urlIbge = `${environment.urlBaseTerritorio}`;
  urlBaseApi = `${environment.urlBaseApi}`;


  constructor(private httpClient: HttpClient) { }


  getLocationStates() {

    return this.httpClient.get<any>(`${this.urlIbge}/estados`).pipe(
      retry(2)
    )

  }


  getLocationCountiesByState(stateId: number) {

    return this.httpClient.get<any>(`${this.urlIbge}/estados/${stateId}/municipios`).pipe(
      retry(2)
    )

  }

  getAddressByZipCode(zipCode: string) {

    console.log(this.urlViaCep)

    return this.httpClient.get<any>(`${this.urlViaCep}/${zipCode}/json`,).pipe(
      retry(2)
    )

  }

  postUserLocation(user: User) {

    return this.httpClient.post<any>(`${this.urlBaseApi}/endereco`, {
      "idCandidato": user.id,
      "cep": user.address.zipCode,
      "logradouro": user.address.streetName,
      "numero": user.address.streetNumber,
      "bairro": user.address.district,
      "localidade": user.address.county,
      "uf": user.address.state
    }).pipe(
      retry(2)
    )

  }

  editUserLocation(user: User) {

    return this.httpClient.put<any>(`${this.urlBaseApi}/endereco`, {
      "idCandidato": user.id,
      "cep": user.address.zipCode,
      "logradouro": user.address.streetName,
      "numero": user.address.streetNumber,
      "bairro": user.address.district,
      "localidade": user.address.county,
      "uf": user.address.state
    }).pipe(
      retry(2)
    )

  }


}
