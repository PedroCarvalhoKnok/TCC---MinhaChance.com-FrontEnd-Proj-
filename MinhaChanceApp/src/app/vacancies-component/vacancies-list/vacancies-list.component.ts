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
import { Router } from '@angular/router';
import { OccupationService } from 'src/app/Services/Occupation/occupation.service';
import { LocationService } from 'src/app/Services/Location/location.service';

@Component({
  selector: 'app-vacancies-list',
  templateUrl: './vacancies-list.component.html',
  styleUrls: ['./vacancies-list.component.scss']
})
export class VacanciesListComponent implements OnInit {

  constructor(private vacancyService: VacancyService, private userService: UserService, public dialog: MatDialog, private router: Router, private occupationService: OccupationService, private locationService: LocationService) { }

  pageEvent!: PageEvent;

  userLogged: any;

  vacanciesFiltered: any;

  filterApplied: boolean = false;

  userCandidaturesRequired: boolean = false;
  

  requirements = ['Ensino superior', 'Ensino médio', 'Conhecimento básico'];
  benefits = ['VR', 'VT', 'Convenio médico', 'Convenio odontologico', 'Gym pass'];
  locations = ['São Paulo - Centro', 'Rio de Janeiro - Centro', 'Parana - Curitiba'];
  modalities = ['Presencial', 'Híbrido', 'Home-Office'];
  occupations: any = [];

  states!: any[];
  counties!: any[];
  stateSelected: string;
  countySelected: string;
  occupationSelected: string;

  vacancyFilter: vacancyFilter = new vacancyFilter();

  // vacancies: Observable<Vacancy[]> = of([{ id: 1, vacancyTitle: 'Estagiario Desenvolvimento Java', creationDate: new Date(), image: this.fileMocked, quantity: 1, salary: 0, isConfidential: false, contractType: 'Estagio', modalidity: 'Hibrido', semanalQuantity: 2, description: 'Buscamos profissional qualificado e responsavel', category: 'Tecnologia', location: 'São Paulo - Centro', benefits: [{ id: 1, description: 'VR + VT', value: 1000 }, { id: 2, description: 'Convenio medico', value: 500 }], requirements: [{ id: 1, description: 'Cursando ensino superior', differential: undefined }] },
  // { id: 2, vacancyTitle: 'Desenvolvedor Junior', creationDate: new Date(), image: this.fileMocked, quantity: 2, salary: 3500, isConfidential: false, contractType: 'CLT', modalidity: 'Remoto', semanalQuantity: 0, description: 'Buscamos profissional qualificado e responsavel', category: 'Tecnologia', location: 'São Paulo - Centro', benefits: [{ id: 1, description: 'VR + VT', value: 1000 }, { id: 2, description: 'Convenio medico', value: 1500 }], requirements: [{ id: 1, description: 'Ensino superior completo', differential: 'Conhecimento básico de .NET' }] },
  // { id: 3, vacancyTitle: 'Consultor Cloud Senior', creationDate: new Date(), image: this.fileMocked, quantity: 1, salary: 0, isConfidential: true, contractType: 'CLT', modalidity: 'Remoto', semanalQuantity: 0, description: 'Buscamos profissional qualificado e responsavel', category: 'Tecnologia', location: 'São Paulo - Centro', benefits: [{ id: 1, description: 'VR + VT', value: 2000 }, { id: 2, description: 'Convenio medico', value: 1500 }], requirements: [{ id: 1, description: 'Ensino superior completo', differential: 'Conhecimento avançado de Azure ou AWS' }] },
  // ]);

  vacancies: Observable<any[]> = of([]);

  async ngOnInit() {

    this.userLogged = JSON.parse(sessionStorage.getItem('user')!);

    console.log(this.userLogged);

    await this.getUsers();

    await this.getStates();

    await this.getOccupationsFilter();

  }

  async getUsers() {

    console.log(this.userCandidaturesRequired + this.userLogged.CPF)

    if (this.userLogged.CPF && !this.userCandidaturesRequired) {

      await this.vacancyService.getVacanciesForCandidates().subscribe(vacancies => {

        this.getOccupationByVacancyId(vacancies).then(() => {

          if (!this.filterApplied){
            console.log('sem filtro')
            this.vacancies = of(vacancies);
          }
          else{
            console.log('com filtro')
            console.log(vacancies)
            this.vacancies = of(this.filterVacancyList(vacancies))
          }
        });

      });

      console.log('vacancy one');

    }
    if (this.userLogged.CPF && this.userCandidaturesRequired) {

      await this.userService.getVacanciesByCandidate(this.userLogged.id).subscribe(vacancies => {

        this.getOccupationByVacancyId(vacancies).then(() => {
          if (!this.filterApplied){
            console.log('sem filtro')
            this.vacancies = of(vacancies);
          }
          else{
            console.log('com filtro')
            console.log(vacancies)
            this.vacancies = of(this.filterVacancyList(vacancies))
          }
        });

      })

    }
    if (this.userLogged.cnpj) {

      await this.vacancyService.getVacanciesForCompanies(this.userLogged.id).subscribe(vacancies => {

        this.getOccupationByVacancyId(vacancies).then(() => {
          if (!this.filterApplied)
            this.vacancies = of(vacancies);
          else
            this.vacancies = of(this.filterVacancyList(vacancies))
        });

      });

    }

    console.log('terminei de rodar')

  }

  async getOccupationByVacancyId(vacancies) {

    for (let vacancy of vacancies) {

      await this.occupationService.getOccupationById(vacancy.idProfissao).subscribe(occupation => {

        vacancy.profissao = occupation[0].descricao

      });

    }

  }

  async getCandidateVacancies() {

    this.userCandidaturesRequired = true;

    await this.userService.getVacanciesByCandidate(this.userLogged.id).subscribe(vacancies => {

      console.log(vacancies);

      this.vacancies = of(vacancies);

    })

  }

  async finishVacancy(vacancyId: number) {

    await this.userService.finishVacancy(vacancyId).subscribe(response => {

      Swal.fire(
        'Sucesso!',
        `${response.message}`,
        'success'
      )

    })

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
    this.vacancyFilter.benefits = benefit;
  }

  changeModality(modality: string) {
    this.vacancyFilter.modality = modality;
  }

  changeLocation(location: string) {
    this.vacancyFilter.location = location;
  }

  changeVacancySalary(event: any) {
    this.vacancyFilter.salary = +event.value;
  }

  changeOccupation(occupationId: number, occupation: string){

    this.occupationSelected = occupation;

    this.vacancyFilter.occupation = occupationId;

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

  async getOccupationsFilter(){

    this.occupationService.getOccupation().subscribe(occupation => {

      console.log(occupation);

      this.occupations = occupation;

    })
  }

  async applyFilters() {


    this.vacancyFilter.vacancyQuantity = +(<HTMLInputElement>document.getElementById(`maxVacancyQuantity`)).value;
    this.vacancyFilter.vacancyCategory = (<HTMLInputElement>document.getElementById(`vacancyCategory`)).value;
    console.log(this.vacancyFilter);

    this.filterApplied = true


    await this.getUsers();


  }

  filterVacancyList(vacancyList: any) {

    if (this.vacancyFilter.isConfidential != undefined) {
      vacancyList = vacancyList.filter(vacancy => vacancy.isConfidential == this.vacancyFilter.isConfidential);
    }

    if (this.vacancyFilter.isPresential) {
      vacancyList = vacancyList.filter(vacancy => vacancy.modalidade === 'Presencial');
    }

    if (this.vacancyFilter.benefits) {
      vacancyList = vacancyList.filter((vacancy) => (vacancy.beneficios === this.vacancyFilter.benefits));
    }

    if (this.vacancyFilter.requirements) {

      vacancyList = vacancyList.filter((vacancy) => (vacancy.requisitos === this.vacancyFilter.requirements));

    }

    if(this.vacancyFilter.occupation){

      vacancyList = vacancyList.filter((vacancy) => (vacancy.idProfissao === this.vacancyFilter.occupation));

    }

    if(this.stateSelected){
      vacancyList = vacancyList.filter(vacancy => vacancy.localizacao.split('-')[0].trim() === this.stateSelected);
    }

    if(this.countySelected){
      vacancyList = vacancyList.filter(vacancy => vacancy.localizacao.split('-')[1].trim() === this.countySelected);
    }
    
    if (this.vacancyFilter.modality) {
      vacancyList = vacancyList.filter(vacancy => vacancy.modalidade == this.vacancyFilter.modality);
    }

    if (this.vacancyFilter.vacancyQuantity != 0 && this.vacancyFilter.vacancyQuantity) {
      vacancyList = vacancyList.filter(vacancy => vacancy.quantidade <= this.vacancyFilter.vacancyQuantity);
    }

    // if (this.vacancyFilter.salary != 0 && this.vacancyFilter.salary) {
    //   vacancyList = vacancyList.filter(vacancy => vacancy.salary <= this.vacancyFilter.salary && !vacancy.isConfidential);
    // }

    console.log(vacancyList)

    return vacancyList;

  }

  goEditVacancy(vacancyId: number) {

    this.router.navigate([`empresa/vagas/editar/${vacancyId}`]);

  }

  goDetailsVacancy(vacancyId: number) {

    this.router.navigate([`empresa/vagas/detalhes/${vacancyId}`]);

  }

  async openMetricsDetails(vacancyId: number) {

    const dialog = this.dialog.open(UserVacancyListDialogComponent, {
      data: {
        "aptidao": 50,
        "usuario": this.userLogged.nome,
        "testeIM": {
          "id": 2,
          "linguistica": 74,
          "matematica": 12,
          "espacial": 25,
          "cinestesica": 45,
          "musical": 58,
          "interpessoal": 78,
          "intrapessoal": 48,
          "naturalista": 47,
          "data": "2022-10-20T00:00:00.000Z",
          "cadastrado": 1
        },
        "testeVaga": {
          "id": 2,
          "linguistica": 74,
          "matematica": 12,
          "espacial": 25,
          "cinestesica": 45,
          "musical": 58,
          "interpessoal": 78,
          "intrapessoal": 48,
          "naturalista": 47,
          "data": "2022-10-20T00:00:00.000Z",
          "cadastrado": 1
        }
      }
    });


    // await this.userService.getUserInfoByVacancy(this.userLogged.id, vacancyId).subscribe(metrics => {
    //   const dialog = this.dialog.open(UserVacancyListDialogComponent, {
    //     data: metrics[0]
    //   });
    // })

  }

  async deleteVacancy(vacancyId: number) {
    await this.vacancyService.deleteVacancy(vacancyId).subscribe(returnMsg =>
      Swal.fire(
        'Vaga deletada com sucesso!',
        `${returnMsg.message}`,
        'success'
      ).then(async (result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      }))
  }

  goToVacancyRegister() {

    Swal.fire({
      title: 'Deseja criar uma nova vaga?',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim!',
      cancelButtonText: 'Não!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.router.navigate([`/empresa/vagas/cadastrar`]);
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


  async getStates() {

    await this.locationService.getLocationStates().subscribe(data => {
      console.log(data)
      this.states = data

    });


  }

  async changeState(stateId: number) {

    this.stateSelected = this.states.find(state => state.id === stateId).nome;
    this.countySelected = '';
    this.vacancyFilter.location = this.stateSelected;

    await this.locationService.getLocationCountiesByState(stateId).subscribe(counties => {
      console.log(counties)
      this.counties = counties;
    })

  }

  changeCounty(county: string) {

    console.log(county)
    console.log(this.stateSelected)
    this.countySelected = county;

  }

  sendCandidature(vacancy: Vacancy) {


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
          // if (responseCandidature) {

          //   await this.userService.sendEmail(userLogged, `Olá ${userLogged.userName}! Sua candidatura para a vaga ${vacancy.vacancyTitle} foi enviada com sucesso, aguarde a resposta da empresa para a próxima etapa. Boa Sorte!`)
          //     .subscribe(response => {
          //       response ?
          //         Swal.fire(
          //           'Sucesso!',
          //           `Candidatura concluída com sucesso, um email de confirmção foi enviado a sua caixa!`,
          //           'success'
          //         ) :
          //         Swal.fire(
          //           'Ops, ocorreu um erro!',
          //           `Ocorreu um erro ao enviar o email de confirmação, porém sua canditura foi concluída!`,
          //           'warning'
          //         );
          //     });
          // }
          // else {
          //   Swal.fire(
          //     'Ops, ocorreu um erro!',
          //     `Ocorreu um erro ao efetivar sua candidatura para a vaga ${vacancy.vacancyTitle}, tente novamente!`,
          //     'warning'
          //   );
          // }
        }
      }
    })

  }

}
