import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable, of } from 'rxjs';
import { vacancyDetailsFilter } from 'src/app/Models/Filters/Vacancy/vacancyDetailsFilter';
import { User } from 'src/app/Models/User/User';
import { Chart } from 'chart.js';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vacancies-details',
  templateUrl: './vacancies-details.component.html',
  styleUrls: ['./vacancies-details.component.scss']
})
export class VacanciesDetailsComponent implements OnInit {
  @ViewChild("CandidatoXVaga", {static: true}) elemento: ElementRef;

  constructor(private router: ActivatedRoute) { }

  pageEvent!: PageEvent

  user: User = new User();

  detailsFilter: vacancyDetailsFilter = new vacancyDetailsFilter();

  title = 'Aptidão geral a vaga';
  vacancyDetailChart = [];

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
    generalRating: [0, 1, 2, 3, 4],
    generalServicesRating: [0, 1, 2, 3],
    objective: 'Crescimento pessoal e profisional ganhando experiencia'

  }])

  ngOnInit(): void {

    let vacancyId = this.router.snapshot.params?.['vacancyId'];

     new Chart(this.elemento.nativeElement, {
      type: 'pie',
      data: { labels: [
        'Não',
        'Sim',
      ],
      datasets:[{
        label: 'Aptidão CandidatoXVaga',
        data: [60,40],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
        ],
        hoverOffset: 4
      }]
    }
    });
   
  }

  changeAge(event: any) {

    this.detailsFilter.age = +event.value;

  }
  changeExperience(event: any) {
    this.detailsFilter.experienceTime = +event.value;
  }

  changeSalaryPretension(event: any) {
    this.detailsFilter.salaryPretension = +event.value;
  }

  changeWorking(status: boolean) {

    this.detailsFilter.status = status ? true : false;

  }

  changeCourseConclusion(status: boolean) {
    this.detailsFilter.hasVacancyCourse = status ? true : false;
  }

  changeHasGradutuation(graduation: boolean) {
    this.detailsFilter.hasGraduation = graduation ? true : false;
  }

  changeHasCertifications(certification: boolean) {
    this.detailsFilter.hasCertifications = certification ? true : false;
  }


  applyFilters() {

    let vacancyDetailsListFiltered!: User[];
    this.detailsFilter.actualCompany = (<HTMLInputElement>document.getElementById(`actualCompany`)).value;
    this.detailsFilter.actualCharge = (<HTMLInputElement>document.getElementById(`actualCharge`)).value;

    this.vacancyDetails.subscribe(details => vacancyDetailsListFiltered = details);

    this.vacancyDetails = of(this.filterVacancyList(vacancyDetailsListFiltered));

  }

  filterVacancyList(vacancyDetailsList: User[]) {

    if (this.detailsFilter.status)
      vacancyDetailsList = vacancyDetailsList.filter(detail => detail.isWorking = true)

    if (this.detailsFilter.actualCompany != '')
      vacancyDetailsList = vacancyDetailsList.filter(detail => detail.actualCompany = this.detailsFilter.actualCompany)

    if (this.detailsFilter.actualCharge != '')
      vacancyDetailsList = vacancyDetailsList.filter(detail => detail.actualCharge = this.detailsFilter.actualCharge)

    if (this.detailsFilter.age != 0)
      vacancyDetailsList = vacancyDetailsList.filter(detail => detail.age = this.detailsFilter.age)

    if (this.detailsFilter.experienceTime != 0)
      vacancyDetailsList = vacancyDetailsList.filter(detail => detail.experiences != undefined ? detail.experiences.map(experience => experience.timeSpent).reduce((acc, sum) => acc + sum) >= this.detailsFilter.experienceTime : undefined)

    if (this.detailsFilter.salaryPretension != 0)
      vacancyDetailsList = vacancyDetailsList.filter(detail => detail.salaryPretension >= this.detailsFilter.salaryPretension)

    if (this.detailsFilter.hasVacancyCourse)
      vacancyDetailsList = vacancyDetailsList.filter(detail => detail.hasVacancyCourse = true)

    if (this.detailsFilter.hasCertifications)
      vacancyDetailsList = vacancyDetailsList.filter(detail => detail.certifications != undefined ? detail.certifications.length > 0 : 0)

    if (this.detailsFilter.hasGraduation)
      vacancyDetailsList = vacancyDetailsList.filter(detail => detail.graduations != undefined ? detail.graduations.length > 0 : 0)


    return vacancyDetailsList;

  }


}
