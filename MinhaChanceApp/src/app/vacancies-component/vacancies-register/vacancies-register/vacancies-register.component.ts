import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Benefit } from 'src/app/Models/Vacancy/Benefit';
import { Requirement } from 'src/app/Models/Vacancy/Requirement';
import { Vacancy } from 'src/app/Models/Vacancy/Vacancy';

@Component({
  selector: 'app-vacancies-register',
  templateUrl: './vacancies-register.component.html',
  styleUrls: ['./vacancies-register.component.scss']
})
export class VacanciesRegisterComponent implements OnInit {

  formVacancy!: FormGroup;
  formBenefits!: FormGroup;
  formRequirements!: FormGroup;

  vacancy!: Vacancy;
  benefits!: Benefit[];
  requirements!: Requirement[];

  constructor() { }

  ngOnInit(): void {

    this.createFormVacancyValidation();
    this.createFormBenefitValidation();
    this.createFormRequirementValidation();

  }


  createFormVacancyValidation(): void {
    this.formVacancy = new FormGroup({
      vacancySalary: new FormControl(this.vacancy.salary, [
        Validators.required,
        this.forbiddenDurationTimeValidator(/0/i),
        this.forbiddenDurationTimeValidator(/-/i)
      ]),
      contractType: new FormControl(this.vacancy.contractType, [
        Validators.required
      ]),
      vacancyQuantity: new FormControl(this.vacancy.quantity, [
        Validators.required,
        this.forbiddenDurationTimeValidator(/0/i)
      ]),
      vacancySemanalQuantity: new FormControl(this.vacancy.semanalQuantity, [
        Validators.required,
        this.forbiddenDurationTimeValidator(/0/i)
      ]),
      vacancyModalidity: new FormControl(this.vacancy.modalidity, [
        Validators.required,
      ]),
      vacancyDescription: new FormControl(this.vacancy.description, [
        Validators.required,
      ]),
      vacancyCategory: new FormControl(this.vacancy.category, [
        Validators.required,
      ]),
    });

  }

  createFormBenefitValidation(): void {
    this.formBenefits = new FormGroup({
      benefitDescription: new FormControl(this.vacancy.benefits.description, [
        Validators.required,
      ]),
      benefitValue: new FormControl(this.vacancy.benefits.value, [
        Validators.required,
        this.forbiddenDurationTimeValidator(/0/i)
      ])
    });

  }

  createFormRequirementValidation(): void {
    this.formRequirements = new FormGroup({
      requirementDescription: new FormControl(this.vacancy.requirements?.description, [
        Validators.required,
      ]),
      requirementDifferential: new FormControl(this.vacancy.requirements?.differencial, [
        Validators.required,
      ])
    });

  }

  forbiddenDurationTimeValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? { forbiddenDurationTime: { value: control.value } } : null;
    };
  }

}
