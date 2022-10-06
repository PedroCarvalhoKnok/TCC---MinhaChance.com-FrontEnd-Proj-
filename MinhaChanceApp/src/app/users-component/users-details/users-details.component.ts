import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/Models/User/User';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.scss']
})
export class UsersDetailsComponent implements OnInit {

  formUserDetails: FormGroup;
  formUserExperiences: FormGroup;
  formUserGraduation: FormGroup;
  formUserCertification: FormGroup;
  user: User;

  constructor() { }

  ngOnInit(): void {
  }

}
