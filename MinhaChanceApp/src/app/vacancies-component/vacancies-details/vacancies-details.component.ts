import { Component, ElementRef, OnInit, ViewChild, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable, of } from 'rxjs';
import { vacancyDetailsFilter } from 'src/app/Models/Filters/Vacancy/vacancyDetailsFilter';
import { User } from 'src/app/Models/User/User';
import { ActivatedRoute } from '@angular/router';
import { VacancyService } from 'src/app/Services/Vacancy/vacancy.service';
import { UserService } from 'src/app/Services/User/user.service';
import { Vacancy } from 'src/app/Models/Vacancy/Vacancy';
import { AnalyticsService } from 'src/app/Services/Analytics/analytics.service';
import { Chart } from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import { UserVacancyDetailsDialogComponent } from 'src/app/Dialogs/user-vacancy-details-dialog/user-vacancy-details-dialog.component';
import Swal from 'sweetalert2';
import { Role } from 'src/app/Enums/role';


@Component({
  selector: 'app-vacancies-details',
  templateUrl: './vacancies-details.component.html',
  styleUrls: ['./vacancies-details.component.scss']
})


export class VacanciesDetailsComponent implements OnInit {

  constructor(private router: ActivatedRoute, private vacancyService: VacancyService, private userService: UserService, private analyticsService: AnalyticsService, public dialog: MatDialog) { }

  pageEvent!: PageEvent

  vacancyId!: number;

  users: User[];

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
    address: { streetName: 'rua dos testes', district: 'bairro teste', country: 'Brasil', zipCode: '09060110', streetNumber: 20 },
    age: 20,
    phone: '(11) 94567-2834',
    hasVacancyCourse: false,
    salaryPretension: 2000.00,
    experiences: [],
    certifications: [],
    graduations: [],
    objective: 'Crescimento pessoal e profisional ganhando experiencia',
    userVacancyInfo: { yes: 56, no: 44 },
    userInteligenciesInfo: { intelligence: 'Linguística', vacancies: ['Tradutor e conhecimento em libras'], skills: [67] },
    interests: [{description: 'Música'}, {description: 'Futebol'}, {description: 'Filmes e séries'}],
    role: Role.Candidate
  },
  {
    id: 2,
    userName: 'Bruna Oliveira',
    profile: 'Candidato',
    email: 'bruhh@teste.com',
    isWorking: false,
    address: { streetName: 'rua general teste', district: 'bairro abc', country: 'Brasil', zipCode: '09063410', streetNumber: 208 },
    age: 20,
    phone: '(11) 95566-2939',
    hasVacancyCourse: true,
    salaryPretension: 1000.00,
    experiences: [],
    certifications: [{ id: 1, certificationDescription: 'certificação introdução python', platform: 'MinhaVez!', timeSpent: 10 }],
    graduations: [],
    objective: 'Crescimento pessoal e profisional ganhando experiencia',
    userVacancyInfo: { yes: 50, no: 50 },
    userInteligenciesInfo: { intelligence: 'Lógica-Matemática', vacancies: ['Estatistico - Iniciante analise de dados', 'Desenvolvedor Java júnior'], skills: [78, 75] },
    interests: [{description: 'Natação'}, {description: 'Artes'}, {description: 'Filmes e séries'}],
    role: Role.Candidate
  }])

  async ngOnInit() {

    this.vacancyId = this.router.snapshot.params?.['vacancyId'];


    // this.vacancyDetails = await this.userService.getUsersByVacancy(this.vacancyId);



    // this.vacancyDetails = candidates;

  }

  async openMetricsDetails(detail: User) {

    await this.userService.getUserInfoByVacancy(detail.id, this.vacancyId).subscribe(user => {
      const dialog = this.dialog.open(UserVacancyDetailsDialogComponent, {
        data: user
      });
    })

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

  async sendFeedBackToCandidate(feedBack: boolean, user: User) {

    let responseFeedBack!: boolean;
    let vacancy!: Vacancy

    if (feedBack) {

      await this.userService.postAffirmativeFeedBack(user.id, this.vacancyId).subscribe(response => responseFeedBack = response);

      if (responseFeedBack) {

        this.vacancyService.getVacancy(this.vacancyId).subscribe(vacancyResponse => { vacancy = vacancyResponse });

        await this.userService.sendEmail(user, `Parabéns ${user.userName}! A empresa X está interessada em seu perfil para a vaga ${vacancy.vacancyTitle}`) //utilizar variavel de usuario logado
        .subscribe(responseEmail => {
          responseEmail ? 
          Swal.fire(
            'Sucesso!',
            `Candidatura do usuário ${user.userName} concluída com sucesso, um email foi enviado ao mesmo!`,
            'warning'
          ):
          Swal.fire(
            'Ops, ocorreu um erro!',
            `Ocorreu um erro ao enviar o email de confirmação ao usuário ${user.userName}, porém sua candidatura foi concluída!`,
            'warning'
          );
        })
      }
      else {
        Swal.fire(
          'Ops, ocorreu um erro!',
          `Ocorreu um erro ao efetivar o interesse do candidato ${user.userName}, tente novamente!`,
          'warning'
        );
      }

    }
    else {

      await this.userService.sendEmail(user, `Olá ${user.userName}! A empresa X não se interessou no seu perfilno momento para vaga ${vacancy.vacancyTitle}, porém vai manter seu currículo salvo para as demais oportunidades que surgir!`) //utilizar variavel de usuario logado
      .subscribe(responseEmail => {
        responseEmail ? 
        Swal.fire(
          'Sucesso!',
          `O email de feedback da vaga foi enviado ao candidato ${user.userName} !`,
          'success'
        ):
        Swal.fire(
          'Ops, ocorreu um erro!',
          `Ocorreu um erro ao enviar o email de feedback ao candidato ${user.userName}, tente novamente!`,
          'warning'
        );

      })

    }
  }


}

