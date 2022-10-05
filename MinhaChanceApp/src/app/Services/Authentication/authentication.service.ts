import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from 'src/app/Models/User/User';
import { environment } from 'src/app/Configs/apiconfig';
import { Role } from 'src/app/Enums/role';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userSubject: BehaviorSubject<User>
  public user: Observable<User>

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.urlBaseApi}/usuario/auth`, { username, password })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
        }));
}

logout() {
  // remove user from local storage to log user out
  let user = JSON.parse(localStorage.getItem('user')!);
  localStorage.removeItem('user');
  this.userSubject.next(new User());
  user.role === Role.Candidate ? this.router.navigate(['/login/candidato']): this.router.navigate(['/login/empresa'])
}
}
