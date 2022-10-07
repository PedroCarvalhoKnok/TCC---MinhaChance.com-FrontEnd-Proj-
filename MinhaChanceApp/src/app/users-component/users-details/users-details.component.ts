import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Graduation } from 'src/app/Models/User/AcademicGraduation';
import { UserCertification } from 'src/app/Models/User/Certification';
import { Experiences } from 'src/app/Models/User/Experiences';
import { User } from 'src/app/Models/User/User';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.scss']
})
export class UsersDetailsComponent implements OnInit {

  formUserDetails!: FormGroup;
  formUserExperiences!: FormGroup;
  formUserGraduation!: FormGroup;
  formUserCertification!: FormGroup;
  user: User = new User();
  experience: Experiences = new Experiences();
  graduation: Graduation = new Graduation();
  certification: UserCertification = new UserCertification();

  constructor() { }

  ngOnInit(): void {
    this.createFormUserCertificationValidation();
    this.createFormUserDetailsValidation();
    this.createFormUserExperiencesValidation();
    this.createFormUserGraduationValidation();
  }


  createFormUserDetailsValidation(): void {
    this.formUserDetails = new FormGroup({
      objective: new FormControl(this.user.objective, [
        Validators.required
      ]),
      actualCompany: new FormControl(this.user.actualCompany, [
        Validators.required
      ]),
      actualCharge: new FormControl(this.user.actualCharge, [
        Validators.required
      ]),
      salaryPretension: new FormControl(this.user.salaryPretension, [
        Validators.required
      ])
    });

  }

  createFormUserExperiencesValidation(): void {
    this.formUserExperiences = new FormGroup({
      companyName: new FormControl(this.experience.company, [
        Validators.required
      ]),
      chargeDescription: new FormControl(this.experience.chargeDescription, [
        Validators.required
      ]),
      timeSpent: new FormControl(this.experience.timeSpent, [
        Validators.required
      ])
    });

  }

  createFormUserGraduationValidation(): void {
    this.formUserGraduation = new FormGroup({
      institute: new FormControl(this.graduation.institute, [
        Validators.required
      ]),
      course: new FormControl(this.graduation.course, [
        Validators.required
      ]),
      graduationDescription: new FormControl(this.graduation.graduationDescription, [
        Validators.required
      ]),
      timeSpent: new FormControl(this.experience.timeSpent, [
        Validators.required
      ])
    });

  }

  createFormUserCertificationValidation(): void {
    this.formUserCertification = new FormGroup({
      certificationDescription: new FormControl(this.certification.certificationDescription, [
        Validators.required
      ]),
      platform: new FormControl(this.certification.platform, [
        Validators.required
      ]),
      timeSpent: new FormControl(this.certification.timeSpent, [
        Validators.required
      ])
    });

  }

}
