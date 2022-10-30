import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from './Enums/role';
import { User } from './Models/User/User';
import { AuthenticationService } from './Services/Authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  user: any;
  title: string = 'MinhaVezApp'

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }

  get isCandidate() {
    return this.user && this.user.role === Role.Candidate;
  }

  get isAuthenticated() {
    return this.user;
  }
  
  goToRegisterCandidate(){

    location.href = '/candidato/cadastrar';

  }

  goToRegisterCompany(){

    location.href = '/empresa/cadastrar';
    
  }

  goToLoginCandidate(){

    location.href = '/candidato/login';
  }

  goToLoginCompany(){
    
    location.href = '/empresa/login';
   
  }

  logout() {
    this.authenticationService.logout();
  }


}
