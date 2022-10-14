import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/Models/Course/Course';
import { User } from 'src/app/Models/User/User';
import { Vacancy } from 'src/app/Models/Vacancy/Vacancy';
import { TestService } from 'src/app/Services/Test/test.service';
import { UserService } from 'src/app/Services/User/user.service';
import { UserVacancyListDialogComponent } from 'src/app/Dialogs/user-vacancy-list-dialog/user-vacancy-list-dialog.component';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2';
import { Role } from 'src/app/Enums/role';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.scss']
})
export class UsersProfileComponent implements OnInit {

  userLogged: User = {
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
    interests: [{description: 'Música'}, {description: 'Futebol'}, {description: 'Filmes e séries'}],
    schooling: {id: 1, descricao: 'Ensino Médio Completo'},
    role: Role.Candidate
  };

  fileMocked = new File([], "", {
    type: "",
  });

  userBestVacancies: Observable<Vacancy[]> = of([{ id: 1, vacancyTitle: 'Estagiario Desenvolvimento Java', creationDate: new Date(), image: this.fileMocked, quantity: 1, salary: 0, isConfidential: false, contractType: 'Estagio', modalidity: 'Hibrido', semanalQuantity: 2, description: 'Buscamos profissional qualificado e responsavel', category: 'Tecnologia', location: 'São Paulo - Centro', benefits: [{ id: 1, description: 'VR + VT', value: 1000 }, { id: 2, description: 'Convenio medico', value: 500 }], requiments: [{ id: 1, description: 'Cursando ensino superior', differential: undefined }] },
  { id: 2, vacancyTitle: 'Desenvolvedor Junior', creationDate: new Date(), image: this.fileMocked, quantity: 2, salary: 3500, isConfidential: false, contractType: 'CLT', modalidity: 'Remoto', semanalQuantity: 0, description: 'Buscamos profissional qualificado e responsavel', category: 'Tecnologia', location: 'São Paulo - Centro', benefits: [{ id: 1, description: 'VR + VT', value: 1000 }, { id: 2, description: 'Convenio medico', value: 1500 }], requiments: [{ id: 1, description: 'Ensino superior completo', differential: 'Conhecimento básico de .NET' }] },
  { id: 3, vacancyTitle: 'Consultor Cloud Senior', creationDate: new Date(), image: this.fileMocked, quantity: 1, salary: 0, isConfidential: true, contractType: 'CLT', modalidity: 'Remoto', semanalQuantity: 0, description: 'Buscamos profissional qualificado e responsavel', category: 'Tecnologia', location: 'São Paulo - Centro', benefits: [{ id: 1, description: 'VR + VT', value: 2000 }, { id: 2, description: 'Convenio medico', value: 1500 }], requiments: [{ id: 1, description: 'Ensino superior completo', differential: 'Conhecimento avançado de Azure ou AWS' }] },
  ]);


  categories: string[] = ['Construção', 'Tecnologia', 'Gestão'];


  userBestCourses: Observable<Course[]> = of([
    { id: 1, certificationId: 1, description: 'Curso introdutório ao Python', courseTitle: 'Introdução Python I', creationDate: new Date(), subscribeQuantity: 100, durationTime: '7 Horas', category: 'Tecnologia', hasTests: true, hasCertification: true, coursePlatform: 'Udemy', courseLink: 'https://www.udemy.com/pt/' },
    { id: 2, description: 'Curso Ruby I', courseTitle: 'Introdução Ruby I', creationDate: new Date(), subscribeQuantity: 100, durationTime: '7 Horas', category: 'Tecnologia', hasTests: true, hasCertification: true, coursePlatform: 'Udemy', courseLink: 'https://www.udemy.com/pt/' },
    { id: 3, description: 'Curso Ruby II', courseTitle: 'Introdução Ruby II', creationDate: new Date(), subscribeQuantity: 10, durationTime: '9 Horas', category: 'Tecnologia', hasTests: true, hasCertification: true, coursePlatform: 'Udemy', courseLink: 'https://www.udemy.com/pt/' },
  ]);



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

  constructor(private userService: UserService, private testService: TestService, private router: ActivatedRoute, public dialog: MatDialog) { }

  async ngOnInit() {

    let userId = this.router.snapshot.params?.['userId'];


    if (userId != undefined) {

      await this.userService.getUserInfoById(userId).subscribe(user => { this.userLogged = user });

      await this.testService.getUserTestResults(userId).subscribe(results => { this.userSkillsByIntelligence = results })

      this.userBestVacancies = await this.userService.getBestVacanciesById(userId);

      this.userBestCourses = await this.userService.getBestCoursesById(userId);

    }
  }

  async openMetricsDetails(vacancyId: number) {

    await this.userService.getUserInfoByVacancy(this.userLogged.id, vacancyId).subscribe(user => {
      const dialog = this.dialog.open(UserVacancyListDialogComponent, {
        data: user
      });
    })

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



  sendCandidature(vacancy: Vacancy) {

    let userLogged!: User;
    let responseCandidature!: boolean;

    Swal.fire({
      title: `Tem certeza que deseja se candidatar a vaga ${vacancy.vacancyTitle}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim!',
      cancelButtonText: 'Não!'
    }).then(async (result) => {
      if (result.isConfirmed) {

        if (this.userLogged) {
          await this.userService.postUserCandidature(this.userLogged.id, vacancy.id).subscribe(response => responseCandidature = response);
          if (responseCandidature) {

            await this.userService.sendEmail(this.userLogged, `Olá ${this.userLogged.userName}! Sua candidatura para a vaga ${vacancy.vacancyTitle} foi enviada com sucesso, aguarde a resposta da empresa para a próxima etapa. Boa Sorte!`)
              .subscribe(response => {
                response ?
                  Swal.fire(
                    'Sucesso!',
                    `Candidatura concluída com sucesso, um email de confirmção foi enviado a sua caixa!`,
                    'success'
                  ) :
                  Swal.fire(
                    'Ops, ocorreu um erro!',
                    `Ocorreu um erro ao enviar o email de confirmação, porém sua canditura foi concluída!`,
                    'warning'
                  );
              });
          }
          else {
            Swal.fire(
              'Ops, ocorreu um erro!',
              `Ocorreu um erro ao efetivar sua candidatura para a vaga ${vacancy.vacancyTitle}, tente novamente!`,
              'warning'
            );
          }
        }
      }
    })

  }

}
