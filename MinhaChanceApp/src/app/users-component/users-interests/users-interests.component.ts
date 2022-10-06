import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users-interests',
  templateUrl: './users-interests.component.html',
  styleUrls: ['./users-interests.component.scss']
})
export class UsersInterestsComponent implements OnInit {

  formUserInterest: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
