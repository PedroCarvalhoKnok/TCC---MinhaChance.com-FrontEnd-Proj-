import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Address } from 'src/app/Models/User/Address';
import { Schooling } from 'src/app/Models/User/Schooling';
import { User } from 'src/app/Models/User/User';
import { SchoolingService } from 'src/app/Services/Schooling/schooling.service';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-users-data',
  templateUrl: './users-data.component.html',
  styleUrls: ['./users-data.component.scss']
})
export class UsersDataComponent implements OnInit {

  formCandidateData!: FormGroup;
  formCompanyData!: FormGroup;
  user: User = new User();
  address: Address = new Address();
  isConfirmed: boolean = false;
  userId: number;
  isCandidate: boolean;
  schoolings!: Schooling[];
  schoolingSelected!: number;
  @Output() sendUserEvent = new EventEmitter<User>();

  constructor(private router: ActivatedRoute, private userService: UserService, private schoolingService: SchoolingService) { }

  ngOnInit(): void {



    this.userId = this.router.snapshot.params?.['userId'];

    if (this.router.snapshot.params?.['user'] === 'candidato') {
      this.isCandidate = true;
      this.createFormCandidateDataValidation();
    }
    else {
      this.isCandidate = false;
      this.createFormCompanyDataValidation();
    }

    this.getSchoolings()

    if (this.userId) {

      this.userService.getUserInfoById(this.userId).subscribe(user => {
        this.user = user;
      })

    }

  }

  async getSchoolings() {

    await this.schoolingService.getSchoolings().subscribe(data => {
     this.schoolings = data

    
    });


  }

  changeSchooling(schoolId: number){

    this.user.schoolingId = schoolId;
    

  }


  createFormCandidateDataValidation(): void {
    this.formCandidateData = new FormGroup({
      userName: new FormControl(this.user.userName, [
        Validators.required
      ]),
      profileName: new FormControl(this.user.profile, [
        Validators.required
      ]),
      email: new FormControl(this.user.email, [
        Validators.required
      ]),
      cpf: new FormControl(this.user.cpf, [
        Validators.required
      ]),
      passWord: new FormControl(this.user.passWord, [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')
      ]),
      birthDate: new FormControl(this.user.birthDate, [
        Validators.required,
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


  createFormCompanyDataValidation(): void {
    this.formCompanyData = new FormGroup({
      profileName: new FormControl(this.user.profile, [
        Validators.required
      ]),
      email: new FormControl(this.user.email, [
        Validators.required
      ]),
      cnpj: new FormControl(this.user.cnpj, [
        Validators.required
      ]),
      companyArea: new FormControl(this.user.companyArea, [
        Validators.required
      ]),
      passWord: new FormControl(this.user.passWord, [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')
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

  validateConfirmPassword() {

    let confirmPassword = (<HTMLInputElement>(document.getElementById('confirmPassword'))).value;

    console.log(this.user.passWord)
    console.log(confirmPassword)

    this.isConfirmed = this.user.passWord === confirmPassword ? false : true;

    return this.isConfirmed;

  }

  sendUserData() {

    if (this.validateConfirmPassword())
      return;

    if (this.isCandidate) {
      if (!this.formCandidateData.valid)
        return;
    }
    else {

      if (!this.formCompanyData.valid)
        return;

    }

    this.user.address = this.address;

    this.sendUserEvent.emit(this.user);

  }

}
