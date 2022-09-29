import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Observable, of } from 'rxjs';
import { vacancyFilter } from 'src/app/Models/Filters/Vacancy/vacancyFilter';
import { Benefit } from 'src/app/Models/Vacancy/Benefit';
import { Requirement } from 'src/app/Models/Vacancy/Requirement';
import { Vacancy } from 'src/app/Models/Vacancy/Vacancy';
import { VacancyService } from 'src/app/Services/Vacancy/vacancy.service';
import { UserVacancyListDialogComponent } from 'src/app/Dialogs/user-vacancy-list-dialog/user-vacancy-list-dialog.component';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/Services/User/user.service';
import { User } from 'src/app/Models/User/User';

@Component({
  selector: 'app-vacancies-list',
  templateUrl: './vacancies-list.component.html',
  styleUrls: ['./vacancies-list.component.scss']
})
export class VacanciesListComponent implements OnInit {

  constructor(private vacancyService: VacancyService, private userService: UserService, public dialog: MatDialog) { }

  pageEvent!: PageEvent;

  userId!: number;

  fileMocked = new File([], "", {
    type: "",
  });

  requirements = ['Ensino superior', 'Ensino médio', 'Conhecimento básico'];
  benefits = ['VR', 'VT', 'Convenio médico', 'Convenio odontologico', 'Gym pass'];
  locations = ['São Paulo - Centro', 'Rio de Janeiro - Centro', 'Parana - Curitiba'];

  vacancyFilter: vacancyFilter = new vacancyFilter();

  vacancies: Observable<Vacancy[]> = of([{ id: 1, vacancyTitle: 'Estagiario Desenvolvimento Java', creationDate: Date.prototype, image: this.fileMocked, quantity: 1, salary: 0, isConfidential: false, contractType: 'Estagio', modalidity: 'Hibrido', semanalQuantity: 2, description: 'Buscamos profissional qualificado e responsavel', category: 'Tecnologia', location: 'São Paulo - Centro', benefits: [{ id: 1, description: 'VR + VT', value: 1000 }, { id: 2, description: 'Convenio medico', value: 500 }], requiments: [{ id: 1, description: 'Cursando ensino superior', differential: undefined }] },
  { id: 2, vacancyTitle: 'Desenvolvedor Junior', creationDate: Date.prototype, image: this.fileMocked, quantity: 2, salary: 3500, isConfidential: false, contractType: 'CLT', modalidity: 'Remoto', semanalQuantity: 0, description: 'Buscamos profissional qualificado e responsavel', category: 'Tecnologia', location: 'São Paulo - Centro', benefits: [{ id: 1, description: 'VR + VT', value: 1000 }, { id: 2, description: 'Convenio medico', value: 1500 }], requiments: [{ id: 1, description: 'Ensino superior completo', differential: 'Conhecimento básico de .NET' }] },
  { id: 3, vacancyTitle: 'Consultor Cloud Senior', creationDate: Date.prototype, image: this.fileMocked, quantity: 1, salary: 0, isConfidential: true, contractType: 'CLT', modalidity: 'Remoto', semanalQuantity: 0, description: 'Buscamos profissional qualificado e responsavel', category: 'Tecnologia', location: 'São Paulo - Centro', benefits: [{ id: 1, description: 'VR + VT', value: 2000 }, { id: 2, description: 'Convenio medico', value: 1500 }], requiments: [{ id: 1, description: 'Ensino superior completo', differential: 'Conhecimento avançado de Azure ou AWS' }] },
  ]);

  async ngOnInit() {

    // this.vacancies = await this.vacancyService.getAllVacanciesByUser(1); //user id

  }

  async getVacancyBenefits(userId: number) {

    let benefitsVacancy!: string[];

    await this.vacancyService.getBenefitsByUser(userId).subscribe(benefits => benefitsVacancy = benefits);

    return benefitsVacancy;

  }

  async getVacancyRequirements(userId: number) {

    let requirementsVacancy!: string[];

    await this.vacancyService.getRequerimentsByUser(userId).subscribe(requirements => requirementsVacancy = requirements);

    return requirementsVacancy;

  }

  async getVacancyLocations(userId: number) {

    let vacancyLocations!: string[];

    await this.vacancyService.getLocationsByUser(userId).subscribe(locations => vacancyLocations = locations);

    return vacancyLocations;

  }

  vacancyConfidenciality(isConfidential: boolean) {
    this.vacancyFilter.isConfidential = isConfidential;
  }

  vacancyPresencial(isPresential: boolean) {
    this.vacancyFilter.isPresential = isPresential;
  }

  changeBenefit(benefit: string) {
    this.vacancyFilter.benefits.push(benefit);
  }

  changeRequirement(requirement: string) {
    this.vacancyFilter.requirements.push(requirement);
  }

  changeLocation(location: string) {
    this.vacancyFilter.location = location;
  }

  changeVacancySalary(event: any) {
    this.vacancyFilter.salary = +event.value;
  }

  deleteVacancyModal(vacancyId: number) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar essa vaga?',
      text: "A ação é irreversível!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim!',
      cancelButtonText: 'Não!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.deleteVacancy(vacancyId);
      }
    })
  }

  applyFilters() {

    let vacanciesFiltered!: Vacancy[];

    this.vacancyFilter.vacancyQuantity = +(<HTMLInputElement>document.getElementById(`maxVacancyQuantity`)).value;
    this.vacancyFilter.vacancyCategory = (<HTMLInputElement>document.getElementById(`vacancyCategory`)).value;

    this.vacancies.subscribe(vacancies => vacanciesFiltered = vacancies)

    this.vacancies = of(this.filterVacancyList(vacanciesFiltered));

  }

  filterVacancyList(vacancyList: Vacancy[]) {
    if (this.vacancyFilter.isConfidential) {
      vacancyList = vacancyList.filter(vacancy => vacancy.isConfidential);
    }

    if (this.vacancyFilter.isPresential) {
      vacancyList = vacancyList.filter(vacancy => vacancy.modalidity == 'Presencial');
    }

    if (this.vacancyFilter.benefits.length > 0) {
      this.vacancyFilter.benefits.forEach(benefitFilter => {
        vacancyList = vacancyList.filter(vacancy => vacancy.benefits.filter(benefit => benefitFilter == benefit.description));
      })
    }

    if (this.vacancyFilter.requirements.length > 0) {
      this.vacancyFilter.requirements.forEach(requirementFilter => {
        vacancyList = vacancyList.filter((vacancy) => (vacancy.requirements?.filter(requirement => requirementFilter == requirement.description)));
      })
    }

    if (this.vacancyFilter.location != '') {
      vacancyList = vacancyList.filter(vacancy => vacancy.location == this.vacancyFilter.location);
    }

    if (this.vacancyFilter.salary != 0) {
      vacancyList = vacancyList.filter(vacancy => vacancy.salary == this.vacancyFilter.salary && !vacancy.isConfidential);
    }

    return vacancyList;

  }

  async openMetricsDetails(vacancyId: number) {

    await this.userService.getUserInfoByVacancy(this.userId, vacancyId).subscribe(user => {
      const dialog = this.dialog.open(UserVacancyListDialogComponent, {
        data: user
      });
    })

  }

  async deleteVacancy(vacancyId: number) {
    await this.vacancyService.deleteVacancy(vacancyId).subscribe(returnMsg =>
      Swal.fire(
        'Deletada!',
        `${returnMsg}`,
        'success'
      ))
  }


  sendEmailCandidature(vacancy: Vacancy) {

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
        await this.userService.getUserInfoById(this.userId).subscribe(user => userLogged = user); //trocar para usuario logado

        if (userLogged) {
          await this.userService.postUserCandidature(userLogged.id, vacancy.id).subscribe(response => responseCandidature = response);
          if (responseCandidature) {

            await this.userService.sendEmail(userLogged, `Olá ${userLogged.userName}! Sua candidatura para a vaga ${vacancy.vacancyTitle} foi enviada com sucesso, aguarde a resposta da empresa para a próxima etapa. Boa Sorte!`)
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
