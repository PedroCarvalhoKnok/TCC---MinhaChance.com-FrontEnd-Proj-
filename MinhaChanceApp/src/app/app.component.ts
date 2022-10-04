import { Component } from '@angular/core';
import { Role } from './Enums/role';
import { User } from './Models/User/User';
import { AuthenticationService } from './Services/Authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  user: User;
  title: string = 'MinhaVezApp'

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }

  get isCandidate() {
    return this.user && this.user.role === Role.Candidate;
  }

  logout() {
    this.authenticationService.logout();
  }


}
