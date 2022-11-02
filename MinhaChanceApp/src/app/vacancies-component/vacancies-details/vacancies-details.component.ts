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

  // vacancyDetails: Observable<any[]> = of([{
  //   id: 3,
  //   userId: 3,
  //   userName: 'Daniel Silva',
  //   profile: 'Candidato',
  //   email: 'daniel.teste123@teste.com',
  //   isWorking: true,
  //   actualCompany: 'Empresa Y',
  //   actualCharge: 'Estagiario',
  //   address: { streetName: 'rua dos testes', district: 'bairro teste', country: 'Brasil', zipCode: '09060110', streetNumber: 20 },
  //   age: 20,
  //   phone: '(11) 94567-2834',
  //   hasVacancyCourse: false,
  //   salaryPretension: 2000.00,
  //   experiences: [],
  //   certifications: [],
  //   graduations: [],
  //   objective: 'Crescimento pessoal e profisional ganhando experiencia',
  //   userVacancyInfo: { yes: 56, no: 44 },
  //   userInteligenciesInfo: { intelligence: 'Linguística', vacancies: ['Tradutor e conhecimento em libras'], skills: [67] },
  //   interests: [{ description: 'Música' }, { description: 'Futebol' }, { description: 'Filmes e séries' }],
  //   schooling: { id: 1, descricao: 'Ensino Médio Completo' },
  //   role: Role.Candidate
  // },
  // {
  //   id: 4,
  //   userId: 3,
  //   userName: 'Bruna Oliveira',
  //   profile: 'Candidato',
  //   email: 'bruhh@teste.com',
  //   isWorking: false,
  //   address: { streetName: 'rua general teste', district: 'bairro abc', country: 'Brasil', zipCode: '09063410', streetNumber: 208 },
  //   age: 20,
  //   phone: '(11) 95566-2939',
  //   hasVacancyCourse: true,
  //   salaryPretension: 1000.00,
  //   experiences: [],
  //   certifications: [{ id: 1, certificationDescription: 'certificação introdução python', platform: 'MinhaVez!', timeSpent: 10 }],
  //   graduations: [],
  //   objective: 'Crescimento pessoal e profisional ganhando experiencia',
  //   userVacancyInfo: { yes: 50, no: 50 },
  //   userInteligenciesInfo: { intelligence: 'Lógica-Matemática', vacancies: ['Estatistico - Iniciante analise de dados', 'Desenvolvedor Java júnior'], skills: [78, 75] },
  //   interests: [{ description: 'Natação' }, { description: 'Artes' }, { description: 'Filmes e séries' }],
  //   schooling: { id: 1, descricao: 'Ensino Médio Completo' },
  //   role: Role.Candidate
  // }])

  vacancyDetails: Observable<any[]> = of([]);

  async ngOnInit() {

    this.vacancyId = this.router.snapshot.params?.['vacancyId'];

    await this.getCandidatesByVacancy();

    console.log(this.vacancyDetails);


    // this.vacancyDetails = candidates;

  }

  async getCandidatesByVacancy() {

    await this.userService.getCandidatesByVacancy(this.vacancyId).subscribe(candidates => {
      console.log(candidates);
      this.vacancyDetails = of(candidates);
    });

  }

  async openMetricsDetails(detail: User) {

    await this.userService.getUserInfoByVacancy(detail.id, this.vacancyId).subscribe(metrics => {
      const dialog = this.dialog.open(UserVacancyDetailsDialogComponent, {
        data: metrics[0]
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


  async applyFilters() {

    let vacancyDetailsListFiltered!: any[];
    this.detailsFilter.actualCompany = (<HTMLInputElement>document.getElementById(`actualCompany`)).value;
    this.detailsFilter.actualCharge = (<HTMLInputElement>document.getElementById(`actualCharge`)).value;

    await this.getCandidatesByVacancy();

    this.vacancyDetails.subscribe(details => {

      this.vacancyDetails = of(this.filterVacancyList(details));
      
    });

    

  }

  filterVacancyList(vacancyDetailsList: any[]): any[] {

    //chamar get de listagem de detalhes


    if (this.detailsFilter.status != undefined)
      vacancyDetailsList = vacancyDetailsList.filter(detail => detail.isWorking == this.detailsFilter.status)

    if (this.detailsFilter.actualCompany != '')
      vacancyDetailsList = vacancyDetailsList.filter(detail => detail.actualCompany = this.detailsFilter.actualCompany)

    if (this.detailsFilter.actualCharge != '')
      vacancyDetailsList = vacancyDetailsList.filter(detail => detail.actualCharge = this.detailsFilter.actualCharge)

    if (this.detailsFilter.age != 0 && this.detailsFilter.age)
      vacancyDetailsList = vacancyDetailsList.filter(detail => detail.age = this.detailsFilter.age)

    if (this.detailsFilter.experienceTime != 0 && this.detailsFilter.experienceTime)
      vacancyDetailsList = vacancyDetailsList.filter(detail => detail.experiences != undefined ? detail.experiences.map(experience => experience.timeSpent).reduce((acc, sum) => acc + sum) >= this.detailsFilter.experienceTime : undefined)

    if (this.detailsFilter.salaryPretension != 0 && this.detailsFilter.salaryPretension)
      vacancyDetailsList = vacancyDetailsList.filter(detail => detail.salaryPretension >= this.detailsFilter.salaryPretension)

    if (this.detailsFilter.hasVacancyCourse)
      vacancyDetailsList = vacancyDetailsList.filter(detail => detail.hasVacancyCourse = true)

    if (this.detailsFilter.hasCertifications)
      vacancyDetailsList = vacancyDetailsList.filter(detail => detail.certifications != undefined ? detail.certifications.length > 0 : 0)

    if (this.detailsFilter.hasGraduation)
      vacancyDetailsList = vacancyDetailsList.filter(detail => detail.graduations != undefined ? detail.graduations.length > 0 : 0)


    return vacancyDetailsList;

  }

  formatMonth(mes: number): string {

    let mesFormatted = mes < 10 ? `0${mes}` : mes.toString();

    return mesFormatted;

  }

  formatCreationDate() {

    let actualDate: Date = new Date();

    var data =
      actualDate.getFullYear() +
      "/" +
      this.formatMonth(actualDate.getMonth() + 1) +
      "/" +
      actualDate.getDate() +
      "T" +
      actualDate.getHours() +
      ":" +
      actualDate.getMinutes() +
      ":" +
      actualDate.getSeconds();

    return data;
  }

  async sendFeedBackToCandidate(feedBack: boolean, candidateVacancy: any) {

    if (feedBack) {

      await this.userService.postAffirmativeFeedBack(candidateVacancy.id, candidateVacancy.userId, this.vacancyId).subscribe(response => {
        Swal.fire(
          'Sucesso!',
          `${response.message}`,
          'success'
        )
      });

      // if (responseFeedBack) {

      //   this.vacancyService.getVacancy(this.vacancyId).subscribe(vacancyResponse => { vacancy = vacancyResponse });

      //   await this.userService.sendEmail(user, `Parabéns ${user.userName}! A empresa X está interessada em seu perfil para a vaga ${vacancy.vacancyTitle}`) //utilizar variavel de usuario logado
      //   .subscribe(responseEmail => {
      //     responseEmail ? 
      //     Swal.fire(
      //       'Sucesso!',
      //       `Candidatura do usuário ${user.userName} concluída com sucesso, um email foi enviado ao mesmo!`,
      //       'warning'
      //     ):
      //     Swal.fire(
      //       'Ops, ocorreu um erro!',
      //       `Ocorreu um erro ao enviar o email de confirmação ao usuário ${user.userName}, porém sua candidatura foi concluída!`,
      //       'warning'
      //     );
      //   })
      // }
      // else {
      //   Swal.fire(
      //     'Ops, ocorreu um erro!',
      //     `Ocorreu um erro ao efetivar o interesse do candidato ${user.userName}, tente novamente!`,
      //     'warning'
      //   );
      // }

    }
    else {

      await this.userService.postNegativeFeedBack(candidateVacancy.id, candidateVacancy.userId, this.vacancyId).subscribe(response => {
        Swal.fire(
          'Atenção!',
          `${response.message}`,
          'warning'
        )
      });

      // await this.userService.sendEmail(user, `Olá ${user.userName}! A empresa X não se interessou no seu perfilno momento para vaga ${vacancy.vacancyTitle}, porém vai manter seu currículo salvo para as demais oportunidades que surgir!`) //utilizar variavel de usuario logado
      // .subscribe(responseEmail => {
      //   responseEmail ? 
      //   Swal.fire(
      //     'Sucesso!',
      //     `O email de feedback da vaga foi enviado ao candidato ${user.userName} !`,
      //     'success'
      //   ):
      //   Swal.fire(
      //     'Ops, ocorreu um erro!',
      //     `Ocorreu um erro ao enviar o email de feedback ao candidato ${user.userName}, tente novamente!`,
      //     'warning'
      //   );

      // })

    }
  }


}

