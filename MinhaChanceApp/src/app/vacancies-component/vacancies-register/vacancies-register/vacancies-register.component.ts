import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Benefit } from 'src/app/Models/Vacancy/Benefit';
import { Requirement } from 'src/app/Models/Vacancy/Requirement';
import { Vacancy } from 'src/app/Models/Vacancy/Vacancy';
import { VacancyService } from 'src/app/Services/Vacancy/vacancy.service';

@Component({
  selector: 'app-vacancies-register',
  templateUrl: './vacancies-register.component.html',
  styleUrls: ['./vacancies-register.component.scss']
})
export class VacanciesRegisterComponent implements OnInit {

  formVacancy!: FormGroup;
  formBenefits!: FormGroup;
  formRequirements!: FormGroup;

  vacancy!: Vacancy;

  contractCategories = ['CLT', 'PJ'];
  modalities = ['Presencial', 'Hibrido', 'Remoto'];

  isCombinated: boolean = false;
  isConfidential: boolean = false;
  isHibrid: boolean = false;

  vacancyId!: number;
  vacancyItemsToBeDeleted!: any[];

  constructor(private vacancyService: VacancyService, private router: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {

    let vacancyId = this.router.snapshot.params?.['vacancyId'];

    this.vacancyId = vacancyId;

    if(this.vacancyId != undefined){
      await this.vacancyService.getVacancy(vacancyId).subscribe(vacancy => this.vacancy = vacancy)
    }

    this.createFormVacancyValidation();
    this.createFormBenefitValidation();
    this.createFormRequirementValidation();



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

  chooseVacancyImage(event: any){
    this.vacancy.image = event.target.files[0];
  }

  async postVacancy(vacancy: Vacancy){
    if(this.formVacancy.valid)
      await this.vacancyService.postVacancy(vacancy);
  }

  async editVacancy(vacancy: Vacancy){

    if(this.vacancyItemsToBeDeleted.length > 0){

      this.vacancyItemsToBeDeleted.forEach(async item => {
        await this.vacancyService.deleteVacancyItem(item.id)
      })
      
    }

    if(this.formVacancy.valid)
      await this.vacancyService.editVacancy(vacancy);
  }

  addBenefit(benefit: Benefit){

    if(this.formBenefits.valid)
      this.vacancy.benefits.push(benefit);

  }

  removeBenefit(){

    this.vacancy.benefits.pop();

  }

  removeRequirement(){

    this.vacancy.requirements.pop();

  }

  addRequirement(requirement: Requirement){

    if(this.formRequirements.valid)
      this.vacancy.requirements.push(requirement);

  }

  editBenefitByIndex(index: number){
    this.vacancy.benefits[index].description = (<HTMLInputElement>document.getElementById(`input-description-${index}`)).value;
    this.vacancy.benefits[index].value = +(<HTMLInputElement>document.getElementById(`input-description-${index}`)).value;
  }

  removeBenefitByIndex(index: number){

    if(this.vacancyId != undefined)
      this.vacancyItemsToBeDeleted.push(this.vacancy.benefits[index])
      
      
    delete this.vacancy.benefits[index];
   
  }

  removeRequirementByIndex(index: number){
    
    if(this.vacancyId != undefined)
      this.vacancyItemsToBeDeleted.push( this.vacancy.requirements[index])  
      
    
    delete  this.vacancy.requirements[index];
  }

  editRequirementByIndex(index: number){
    this.vacancy.requirements[index].description = (<HTMLInputElement>document.getElementById(`input-description-${index}`)).value;
    this.vacancy.requirements[index].differencial = (<HTMLInputElement>document.getElementById(`input-description-${index}`)).value;
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
      benefitDescription: new FormControl(this.vacancy.benefit.description, [
        Validators.required,
      ]),
      benefitValue: new FormControl(this.vacancy.benefit.value, [
        Validators.required,
        this.forbiddenDurationTimeValidator(/0/i),
        this.forbiddenDurationTimeValidator(/[-0-9]+/i)
      ])
    });

  }

  createFormRequirementValidation(): void {
    this.formRequirements = new FormGroup({
      requirementDescription: new FormControl(this.vacancy.requirement.description, [
        Validators.required,
      ]),
      requirementDifferential: new FormControl(this.vacancy.requirement.differencial, [
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
