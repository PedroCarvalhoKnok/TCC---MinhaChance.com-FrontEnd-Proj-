import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/Models/User/User';

@Component({
  selector: 'app-vacancies-details',
  templateUrl: './vacancies-details.component.html',
  styleUrls: ['./vacancies-details.component.scss']
})
export class VacanciesDetailsComponent implements OnInit {

  constructor() { }

  pageEvent!: PageEvent

  user: User = new User();

  vacancyDetails: Observable<User[]> = of([{
    id: 1,
    userName: 'Daniel Silva',
    profile: 'Candidato',
    email: 'daniel.teste123@teste.com',
    isWorking: true,
    actualCompany: 'Empresa Y',
    actualCharge: 'Estagiario',
    age: 20,
    phone: '(11) 94567-2834',
    hasVacancyCourse: false,
    salaryPretension: 2000.00,
    experiences: [],
    certifications: [],
    graduations: [],
    generalRating: 5,
    generalServicesRating: 4,
    objective: 'Crescimento pessoal e profisional ganhando experiencia'

  }])

  ngOnInit(): void {
  }

}
