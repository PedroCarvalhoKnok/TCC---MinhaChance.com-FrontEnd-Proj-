import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Benefit } from 'src/app/Models/Vacancy/Benefit';
import { Requirement } from 'src/app/Models/Vacancy/Requirement';
import { Vacancy } from 'src/app/Models/Vacancy/Vacancy';
import { VacancyService } from 'src/app/Services/Vacancy/vacancy.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vacancies-register',
  templateUrl: './vacancies-register.component.html',
  styleUrls: ['./vacancies-register.component.scss']
})
export class VacanciesRegisterComponent implements OnInit {

  formVacancy!: FormGroup;
  formBenefits!: FormGroup;

  vacancy: Vacancy = new Vacancy();
  benefit: Benefit = new Benefit();
  requirement: Requirement = new Requirement();


  contractCategories = ['CLT', 'PJ', 'Estagio', 'Jovem Aprendiz', 'Trainee'];
  modalities = ['Presencial', 'Hibrido', 'Remoto'];
  locations: string[] = ['Sao Paulo - Centro', 'Rio de Janeiro - Centro', 'Parana - Curitiba']

  isCombinated: boolean = false;
  isConfidential: boolean = false;
  isHibrid: boolean = false;

  vacancyId!: number;
 

  constructor(private vacancyService: VacancyService, private router: ActivatedRoute) { }

  async ngOnInit() {

    this.vacancyId = this.router.snapshot.params?.['vacancyId'];

    if (this.vacancyId) {
      await this.vacancyService.getVacancy(this.vacancyId).subscribe(vacancy => {
        console.log(vacancy);
        this.vacancy.userId = vacancy[0].idEmpresas;
        this.vacancy.id = vacancy[0].id;
        this.vacancy.vacancyTitle = vacancy[0].titulo;
        this.vacancy.quantity = vacancy[0].quantidade;
        (<HTMLInputElement>document.getElementById('vacancyDescription')).value = vacancy[0].descricao;
        (<HTMLInputElement>document.getElementById(`benefitDescription`)).value = vacancy[0].beneficios; //alterar
      })
    }

    this.createFormVacancyValidation();
    this.createFormBenefitValidation();
    //this.getLocationsByUserId();

  }

  async getLocationsByUserId() {
    await this.vacancyService.getLocationsByUser(1).subscribe(location => this.locations = location)//user id
  }

  changeContractType(type: string) {
    this.vacancy.contractType = type;
  }

  changeSalaryDisplay() {
    this.isCombinated = !this.isCombinated

    if (this.isCombinated) {
      this.vacancy.salary = 0;
      (<HTMLInputElement>document.getElementById('vacancySalary')).disabled = true;
    }
    else {
      (<HTMLInputElement>document.getElementById('vacancySalary')).disabled = false;
    }

  }

  confidencialVacancy() {

    this.isConfidential = !this.isConfidential

    this.vacancy.isConfidential = this.isConfidential ? true : false;

  }

  changeModality(modality: string) {

    this.vacancy.modalidity = modality;

    if (modality == 'Hibrido')
      this.isHibrid = true;


  }

  changeLocation(location: string) {

    this.vacancy.location = location;

  }

  chooseVacancyImage(event: any) {
    this.vacancy.image = event.target.files[0];
  }

  goToVacancyRegister(vacancy: Vacancy) {

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
        this.postVacancy(vacancy);
      }
    })

  }

  goToVacancyEdit(vacancy: Vacancy) {

    Swal.fire({
      title: `Deseja editar a vaga ${vacancy.vacancyTitle}?`,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim!',
      cancelButtonText: 'Não!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.editVacancy(vacancy);
      }
    })

  }

  async postVacancy(vacancy: Vacancy) {

    vacancy.description = (<HTMLInputElement>document.getElementById('vacancyDescription')).value;
    vacancy.creationDate = new Date();
    vacancy.userId = JSON.parse(sessionStorage.getItem('user')!).id;
    vacancy.benefit = this.benefit;
    vacancy.requirement = this.requirement;

    await this.vacancyService.postVacancy(vacancy).subscribe(retornMsg =>
      Swal.fire(
        {
          title: `${retornMsg.message}`,
          icon: 'success',
        }));




  }

  async editVacancy(vacancy: Vacancy) {

    vacancy.description = (<HTMLInputElement>document.getElementById('vacancyDescription')).value;
    vacancy.userId = JSON.parse(sessionStorage.getItem('user')!).id;
    vacancy.benefit = this.benefit;
    vacancy.requirement = this.requirement;

    console.log(vacancy);


    await this.vacancyService.editVacancy(vacancy).subscribe(returnMsg =>
      Swal.fire(
        {
          title: `${returnMsg.message}`,
          icon: 'success',
        }));

  }

  addBenefit() {

    if (this.formBenefits.valid) {
      this.benefit.description = (<HTMLInputElement>document.getElementById(`benefitDescription`)).value;
      

      console.log(this.benefit);

      this.vacancy.benefits.push(this.benefit.description);

    }

  }

  addRequirement() {

    this.requirement.description = (<HTMLInputElement>document.getElementById(`requirementDescription`)).value;
    this.requirement.differencial = (<HTMLInputElement>document.getElementById(`requirementDifferential`)).value;

    this.vacancy.requirements?.push(this.requirement);

  }

  createFormVacancyValidation(): void {
    this.formVacancy = new FormGroup({
      vacancyTitle: new FormControl(this.vacancy.vacancyTitle, [
        Validators.required
      ]),
      vacancySalary: new FormControl(this.vacancy.salary, [
        Validators.required,
      ]),
      contractType: new FormControl(this.vacancy.contractType, [
        Validators.required
      ]),
      contractModality: new FormControl(this.vacancy.modalidity, [
        Validators.required
      ]),
      vacancyQuantity: new FormControl(this.vacancy.quantity, [
        Validators.required,
        this.forbiddenDurationTimeValidator(/0/i),
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
      benefitDescription: new FormControl(this.benefit.description, [
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
