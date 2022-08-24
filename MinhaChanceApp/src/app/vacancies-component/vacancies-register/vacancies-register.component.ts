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


  contractCategories = ['CLT', 'PJ', 'Estagio'];
  modalities = ['Presencial', 'Hibrido', 'Remoto'];
  locations: string[] = ['Sao Paulo - Centro', 'Rio de Janeiro - Centro', 'Parana - Curitiba']

  isCombinated: boolean = false;
  isConfidential: boolean = false;
  isHibrid: boolean = false;

  vacancyId!: number;
  vacancyBenefitsToBeDeleted!: Benefit[];
  vacancyRequirementsToBeDeleted!: Requirement[];

  constructor(private vacancyService: VacancyService, private router: ActivatedRoute) { }

  async ngOnInit(){

    let vacancyId = this.router.snapshot.params?.['vacancyId'];

    this.vacancyId = vacancyId;

    if(this.vacancyId != undefined){
      await this.vacancyService.getVacancy(vacancyId).subscribe(vacancy => this.vacancy = vacancy)
    }

    this.createFormVacancyValidation();
    this.createFormBenefitValidation();
    //this.getLocationsByUserId();

  }

  async getLocationsByUserId(){
    await this.vacancyService.getLocationsByUser(1).subscribe(location => this.locations = location)//user id
  }

  changeContractType(type: string){
    this.vacancy.contractType = type;
  }

  changeSalaryDisplay(){
    this.isCombinated = !this.isCombinated

    if(this.isCombinated){
      this.vacancy.salary = 0;
      (<HTMLInputElement>document.getElementById('vacancySalary')).disabled = true;
    }
    else{
      (<HTMLInputElement>document.getElementById('vacancySalary')).disabled = false;
    }

  }

  confidencialVacancy(){
    this.isConfidential = !this.isConfidential

    this.vacancy.isConfidential = this.isConfidential ? true: false;
    
  }

  changeModality(modality: string){

    this.vacancy.modalidity = modality;

    if(modality == 'Hibrido')
      this.isHibrid = true;


  }

  changeLocation(location: string){

    this.vacancy.location = location;

  }

  chooseVacancyImage(event: any){
    this.vacancy.image = event.target.files[0];
  }

  async postVacancy(vacancy: Vacancy){
    
    this.vacancy.description = (<HTMLInputElement>document.getElementById('vacancyDescription')).value;

    if(this.formVacancy.valid){
      
      await this.vacancyService.postVacancy(vacancy).subscribe(retornMsg => 
        Swal.fire(
          {title: `${retornMsg}`,
           icon: 'success',
          }));
      
    }

    
  }

  async editVacancy(vacancy: Vacancy){

    if(this.vacancyBenefitsToBeDeleted.length > 0){

      this.vacancyBenefitsToBeDeleted.forEach(async item => {
        await this.vacancyService.deleteVacancyBenefit(item.id)
      })
      
    }

    if(this.vacancyRequirementsToBeDeleted.length > 0){

      this.vacancyRequirementsToBeDeleted.forEach(async item => {
        await this.vacancyService.deleteVacancyRequirement(item.id)
      })
      
    }

    if(this.formVacancy.valid){
      await this.vacancyService.editVacancy(vacancy).subscribe(returnMsg => 
        Swal.fire(
          {title: `${returnMsg}`,
           icon: 'success',
          }));
    }
  }

  addBenefit(benefit: Benefit){

    if(this.formBenefits.valid){
      this.benefit.description = (<HTMLInputElement>document.getElementById(`benefitDescription`)).value;
      this.benefit.value = +(<HTMLInputElement>document.getElementById(`benefitValue`)).value;
      this.vacancy.benefits.push(benefit);
    }

  }

  removeBenefit(){

    this.vacancy.benefits.pop();

  }

  removeRequirement(){

    this.vacancy.requirements?.pop();

  }

  addRequirement(requirement: Requirement){

    requirement.description = (<HTMLInputElement>document.getElementById(`requirementDescription`)).value;
    requirement.differencial = (<HTMLInputElement>document.getElementById(`requirementDifferential`)).value;

    
    this.vacancy.requirements?.push(requirement);

  }

  editBenefitByIndex(index: number){
    this.vacancy.benefits[index].description = (<HTMLInputElement>document.getElementById(`input-description-${index}`)).value;
    this.vacancy.benefits[index].value = +(<HTMLInputElement>document.getElementById(`input-description-${index}`)).value;
  }

  removeBenefitByIndex(index: number){

    if(this.vacancyId != undefined)
      this.vacancyBenefitsToBeDeleted.push(this.vacancy.benefits[index])
      
      
    delete this.vacancy.benefits[index];
   
  }

  removeRequirementByIndex(index: number){
    
    if(this.vacancyId != undefined)
      if(this.vacancy.requirements != undefined)
        this.vacancyRequirementsToBeDeleted.push(this.vacancy.requirements[index])  
      
    
    delete this.vacancy.requirements??[index];
  }

  editRequirementByIndex(index: number){
    this.vacancy.requirements != undefined ? this.vacancy.requirements[index].description = (<HTMLInputElement>document.getElementById(`input-description-${index}`)).value: '';
    this.vacancy.requirements != undefined ? this.vacancy.requirements[index].differencial = (<HTMLInputElement>document.getElementById(`input-description-${index}`)).value: '';
  }

  createFormVacancyValidation(): void {
    this.formVacancy = new FormGroup({
      vacancySalary: new FormControl(this.vacancy.salary, [
        Validators.required,
        this.forbiddenDurationTimeValidator(/0/i),
        this.forbiddenDurationTimeValidator(/[-0-9]+/i)
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
        this.forbiddenDurationTimeValidator(/[-0-9]+/i)
      ]),
      vacancySemanalQuantity: new FormControl(this.vacancy.semanalQuantity, [
        Validators.required,
        this.forbiddenDurationTimeValidator(/0/i),
        this.forbiddenDurationTimeValidator(/[-0-9]+/i)
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
      ]),
      benefitValue: new FormControl(this.benefit.value, [
        Validators.required,
        this.forbiddenDurationTimeValidator(/0/i),
        this.forbiddenDurationTimeValidator(/[-0-9]+/i)
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
