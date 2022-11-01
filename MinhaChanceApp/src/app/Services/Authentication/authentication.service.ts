import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from 'src/app/Models/User/User';
import { environment } from 'src/environments/environment';
import { Role } from 'src/app/Enums/role';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userSubject: BehaviorSubject<User>
  public user: Observable<User>

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    console.log(environment.urlBaseApi)
    return this.http.post<any>(`${environment.urlBaseApi}/login`, {
      "cpfcnpj": username,
      "senha": password
    })
      .pipe(map(result => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        console.log(result);
        this.userSubject.next(result);
        return result;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    JSON.parse(sessionStorage.getItem('user')!);
    sessionStorage.removeItem('user');
    this.userSubject.next(new User());
    
  }
}
