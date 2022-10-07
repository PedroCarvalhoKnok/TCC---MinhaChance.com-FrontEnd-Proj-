import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Interest } from 'src/app/Models/User/Interest';

@Component({
  selector: 'app-users-interests',
  templateUrl: './users-interests.component.html',
  styleUrls: ['./users-interests.component.scss']
})
export class UsersInterestsComponent implements OnInit {

  formUserInterest!: FormGroup;
  @Input() interest: Interest = new Interest();

  constructor() { }

  ngOnInit(): void {
    this.createFormUserInterestsValidation();
  }


  createFormUserInterestsValidation(): void {
    this.formUserInterest = new FormGroup({
      description: new FormControl(this.interest.description, [
        Validators.required
      ])
    });

  }
}
