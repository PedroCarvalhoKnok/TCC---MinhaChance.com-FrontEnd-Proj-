import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/Models/Course/Course';
import { User } from 'src/app/Models/User/User';
import { Vacancy } from 'src/app/Models/Vacancy/Vacancy';
import { TestService } from 'src/app/Services/Test/test.service';
import { UserService } from 'src/app/Services/User/user.service';
import { UserVacancyListDialogComponent } from 'src/app/Dialogs/user-vacancy-list-dialog/user-vacancy-list-dialog.component';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2';
import { Role } from 'src/app/Enums/role';
import { SituationService } from 'src/app/Services/Situation/situation.service';
import { SchoolingService } from 'src/app/Services/Schooling/schooling.service';
import { AnalyticsService } from '../../Services/Analytics/analytics.service';
import { LocationService } from '../../Services/Location/location.service';
import { Address } from '../../Models/User/Address';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.scss']
})
export class UsersProfileComponent implements OnInit {

  userLogged: any = {
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
    interests: [{ description: 'Música' }, { description: 'Futebol' }, { description: 'Filmes e séries' }],
    schooling: { id: 1, descricao: 'Ensino Médio Completo' },
    role: Role.Candidate
  };

  situation: string;
  schooling: string;


  userBestVacancies: any = [];
  userVacanciesSkills: any = [];
  userAddress: any;


  categories: string[] = ['Construção', 'Tecnologia', 'Gestão'];



  userSkillsByIntelligence: any[] = [
    {
      name: 'inteligencia1',
      skill: 10,
    },
    {
      name: 'inteligencia2',
      skill: 20,
    },
    {
      name: 'inteligencia3',
      skill: 30,
    },
    {
      name: 'inteligencia4',
      skill: 40,
    },
    {
      name: 'inteligencia5',
      skill: 50,
    },
    {
      name: 'inteligencia6',
      skill: 60,
    },
    {
      name: 'inteligencia7',
      skill: 70,
    },
    {
      name: 'inteligencia8',
      skill: 10,
    },

  ];

  constructor(private userService: UserService, private testService: TestService, private router: ActivatedRoute, public dialog: MatDialog, private route: Router, private schoolingService: SchoolingService, private situationService: SituationService, private analyticsService: AnalyticsService, private locationService: LocationService) { }

  async ngOnInit() {

    let userId = this.router.snapshot.params?.['userId'];

    if (userId != undefined) {

      this.userLogged = JSON.parse(sessionStorage.getItem('user')!);

      await this.getSituationById(this.userLogged.idSituacaoEmpregaticia);

      await this.getSchoolingById(this.userLogged.idEscolaridade);

      console.log(this.userLogged.idTesteIM)

      await this.testService.getUserTestResults(this.userLogged.idTesteIM).subscribe(results => { this.userSkillsByIntelligence = results[0] })

      await this.analyticsService.getVancanciesUserSkills(userId).subscribe(vacancies => {
        console.log(vacancies);
        this.getCompanybyId(vacancies).then(() => {

          this.userBestVacancies = vacancies;

        })

      });

      await this.locationService.getAddressById(userId).subscribe(address => {

        this.userAddress = address[0];

      })

      //this.userBestCourses = await this.userService.getBestCoursesById(userId);

    }
  }

  formatDate(date: string): string {

    date = `${date.split('-')[2][0]}${date.split('-')[2][1]}/${date.split('-')[1]}/${date.split('-')[0]}`;

    return date;

  }

  async getCompanybyId(vacancies: any) {

    for (let vacancy of vacancies) {

      console.log(vacancy.id)
      await this.userService.getCompanyInfoById(vacancy.idEmpresas).subscribe(result => {

        console.log(result)
        vacancy.empresa = result[0].razaoSocial;

      })

    }
  }

  getSchoolingById(schoolingId: number) {

    this.schoolingService.getSchoolingById(schoolingId).subscribe(schooling => {
      this.userLogged.schooling = schooling[0].descricao;
      console.log(schooling)
    })

  }

  getSituationById(situationId: number) {

    this.situationService.getSituationById(situationId).subscribe(situation => {
      this.userLogged.situation = situation[0].descricao;
      console.log(situation)
    })

  }

  async openMetricsDetails(vacancyId: number) {

    await this.userService.getUserInfoByVacancy(this.userLogged.id, vacancyId).subscribe(user => {
      const dialog = this.dialog.open(UserVacancyListDialogComponent, {
        data: user
      });
    })

  }

  editUserProfile() {

    this.route.navigate([`/${this.userLogged.CPF ? 'candidato' : 'empresa'}/editar/${this.userLogged.id}`]);

  }


  goToLink(url: string) {

    Swal.fire({
      title: 'Tem certeza que deseja visitar esse curso?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim!',
      cancelButtonText: 'Não!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        window.open(url, "_blank");
      }
    })

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



  sendCandidature(vacancy: any) {

    Swal.fire({
      title: `Tem certeza que deseja se candidatar a vaga ${vacancy.titulo}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim!',
      cancelButtonText: 'Não!'
    }).then(async (result) => {
      if (result.isConfirmed) {

        console.log(this.userLogged)

        if (this.userLogged) {
          await this.userService.postUserCandidature(this.userLogged.id, vacancy.id, this.formatCreationDate()).subscribe(response => {
            Swal.fire(
              'Sucesso!',
              `${response.message}`,
              'success'
            )
          }
          );

        }
      }
    })



  }

}
