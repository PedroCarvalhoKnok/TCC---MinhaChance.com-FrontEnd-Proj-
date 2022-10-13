import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Schooling } from 'src/app/Models/User/Schooling';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SchoolingService {

  urlSchooling = `${environment.urlBaseApi}/escolaridade`;

  constructor(private httpClient: HttpClient) { }


  getSchoolings(){
    
      return this.httpClient.get<Schooling[]>(this.urlSchooling).pipe(
        retry(2)
      )

  }



  
}
