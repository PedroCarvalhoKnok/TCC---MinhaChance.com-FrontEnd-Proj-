import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/Models/User/Address';
import { User } from 'src/app/Models/User/User';

@Component({
  selector: 'app-users-data',
  templateUrl: './users-data.component.html',
  styleUrls: ['./users-data.component.scss']
})
export class UsersDataComponent implements OnInit {

  formUserData!: FormGroup;
  user: User = new User()
  address: Address = new Address();

  constructor() { }

  ngOnInit(): void {

    this.createFormUserDataValidation();
  }


  createFormUserDataValidation(): void {
    this.formUserData = new FormGroup({
      userName: new FormControl(this.user.userName, [
        Validators.required
      ]),
      profileName: new FormControl(this.user.profile, [
        Validators.required
      ]),
      email: new FormControl(this.user.email, [
        Validators.required
      ]),
      passWord: new FormControl(this.user.passWord, [
        Validators.required
      ]),
      age: new FormControl(this.user.age, [
        Validators.required,
      ]),
      district: new FormControl(this.address.district, [
        Validators.required,
      ]),
      zipCode: new FormControl(this.address.zipCode, [
        Validators.required,
      ]),
      streetName: new FormControl(this.address.streetName, [
        Validators.required,
      ]),
      streetNumber: new FormControl(this.address.streetNumber, [
        Validators.required,
      ]),
      contact: new FormControl(this.user.phone, [
        Validators.required,
      ]),
    });

  }

}
