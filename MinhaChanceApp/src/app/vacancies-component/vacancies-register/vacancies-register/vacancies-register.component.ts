import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-vacancies-register',
  templateUrl: './vacancies-register.component.html',
  styleUrls: ['./vacancies-register.component.scss']
})
export class VacanciesRegisterComponent implements OnInit {

  formVacancy!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
