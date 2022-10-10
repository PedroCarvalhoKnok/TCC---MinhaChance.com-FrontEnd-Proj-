import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Address } from 'src/app/Models/User/Address';
import { User } from 'src/app/Models/User/User';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-users-data',
  templateUrl: './users-data.component.html',
  styleUrls: ['./users-data.component.scss']
})
export class UsersDataComponent implements OnInit {

  formUserData!: FormGroup;
  user: User = new User();
  address: Address = new Address();
  isConfirmed: boolean = false;
  userId: number;
  @Output() sendUserEvent = new EventEmitter<User>();

  constructor(private router: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {

    this.createFormUserDataValidation();

    this.userId = this.router.snapshot.params?.['userId'];

    if(this.userId){

      this.userService.getUserInfoById(this.userId).subscribe(user => {
        this.user = user;
      })
      
    }
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
  

  validateConfirmPassword(){

    let confirmPassword = (<HTMLInputElement>(document.getElementById('confirmPassword'))).value;

    this.isConfirmed = this.user.passWord === confirmPassword ? true: false;

    return this.isConfirmed;

  }

  sendUserData(){

    if(!this.validateConfirmPassword())
      return;

    this.user.address = this.address;

    this.sendUserEvent.emit(this.user);

  }

}
