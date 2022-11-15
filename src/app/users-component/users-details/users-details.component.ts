import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Graduation } from 'src/app/Models/User/AcademicGraduation';
import { UserCertification } from 'src/app/Models/User/Certification';
import { Experiences } from 'src/app/Models/User/Experiences';
import { User } from 'src/app/Models/User/User';
import { UserService } from 'src/app/Services/User/user.service';

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
  userId: number;
  experience: Experiences = new Experiences();
  graduation: Graduation = new Graduation();
  certification: UserCertification = new UserCertification();

  experiences: Experiences[] = [];
  graduations: Graduation[] = [];
  certifications: UserCertification[] = [];

  needObjective: boolean = false;
  IsWorking: boolean = false;
  @Output() sendDetailsEvent = new EventEmitter<User>();
  constructor(private router: ActivatedRoute, private userService: UserService) { }

  async ngOnInit() {
    this.createFormUserCertificationValidation();
    this.createFormUserDetailsValidation();
    this.createFormUserExperiencesValidation();
    this.createFormUserGraduationValidation();

    this.userId = this.router.snapshot.params?.['userId'];

    if (this.userId) {

      await this.userService.getCandidateInfoById(this.userId).subscribe(user => {
        this.user = user;
        this.experiences = user.experiences!;
        this.graduations = user.graduations!;
        this.certifications = user.certifications!;
      })

    }
  }

  changeIsWorking() {
    this.IsWorking = !this.IsWorking;
  }

  addExperience() {
    if (this.formUserExperiences.valid) {
      this.experience.company = (<HTMLInputElement>(document.getElementById('companyName'))).value;
      this.experience.chargeDescription = (<HTMLInputElement>(document.getElementById('chargeDescription'))).value;
      this.experience.timeSpent = +(<HTMLInputElement>(document.getElementById('timeSpentExperience'))).value;

      this.experiences.push(this.experience);
    }
  }

  editExperienceByIndex(index: number) {

    this.experiences[index].company = (<HTMLInputElement>(document.getElementById('companyName'))).value;
    this.experiences[index].chargeDescription = (<HTMLInputElement>(document.getElementById('chargeDescription'))).value;
    this.experiences[index].timeSpent = +(<HTMLInputElement>(document.getElementById('timeSpentExperience'))).value;
  }

  removeExperienceByIndex(index: number) {

    delete this.experiences[index];

  }

  removeExperience() {
    this.experiences.pop();
  }

  addGraduation() {
    if (this.formUserGraduation.valid) {
      this.graduation.institute = (<HTMLInputElement>(document.getElementById('institute'))).value;
      this.graduation.course = (<HTMLInputElement>(document.getElementById('course'))).value;
      this.graduation.graduationDescription = (<HTMLInputElement>(document.getElementById('courseDescription'))).value;
      this.graduation.timeSpent = +(<HTMLInputElement>(document.getElementById('timeSpentGraduation'))).value;
      this.graduation.graduationDescription = (<HTMLInputElement>(document.getElementById('courseDescription'))).value;

      this.graduations.push(this.graduation);
    }
  }

  editGraduationByIndex(index: number) {

    this.graduations[index].institute = (<HTMLInputElement>(document.getElementById('institute'))).value;
    this.graduations[index].course = (<HTMLInputElement>(document.getElementById('course'))).value;
    this.graduations[index].graduationDescription = (<HTMLInputElement>(document.getElementById('courseDescription'))).value;
    this.graduations[index].timeSpent = +(<HTMLInputElement>(document.getElementById('timeSpentGraduation'))).value;
  }

  removeGraduationByIndex(index: number) {

    delete this.graduations[index];

  }

  removeGraduation() {
    this.graduations.pop();
  }

  addCertification() {
    if (this.formUserCertification.valid) {

      this.certification.platform = (<HTMLInputElement>(document.getElementById('platform'))).value;
      this.certification.timeSpent = +(<HTMLInputElement>(document.getElementById('courseDescription'))).value;
      this.certification.certificationDescription = (<HTMLInputElement>(document.getElementById('certificationDescription'))).value;

      this.certifications.push(this.certification);
    }
  }

  editCertificationByIndex(index: number) {

    this.certifications[index].platform = (<HTMLInputElement>(document.getElementById('platform'))).value;
    this.certifications[index].certificationDescription = (<HTMLInputElement>(document.getElementById('course'))).value;
    this.certifications[index].timeSpent = +(<HTMLInputElement>(document.getElementById('courseDescription'))).value;

  }

  removeCertificationByIndex(index: number) {

    delete this.certifications[index]
  }

  removeCertification() {
    this.certifications.pop();
  }

  sendUserDetail() {

    if (!this.user.objective) {
      this.needObjective = true;
      return;
    }

    if (!this.formUserExperiences.valid || !this.formUserGraduation.valid || !this.formUserCertification.valid)
      return;

    if (this.formUserDetails.valid) {
      this.user.objective = (<HTMLInputElement>(document.getElementById('userObjective'))).value;

      this.user.experiences = this.experiences;
      this.user.graduations = this.graduations;
      this.user.certifications = this.certifications;

      this.sendDetailsEvent.emit(this.user);
    }

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
