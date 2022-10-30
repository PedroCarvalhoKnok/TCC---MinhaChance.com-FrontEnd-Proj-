import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Address } from 'src/app/Models/User/Address';
import { Schooling } from 'src/app/Models/User/Schooling';
import { Situation } from 'src/app/Models/User/Situation';
import { User } from 'src/app/Models/User/User';
import { SchoolingService } from 'src/app/Services/Schooling/schooling.service';
import { SituationService } from 'src/app/Services/Situation/situation.service';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-users-data',
  templateUrl: './users-data.component.html',
  styleUrls: ['./users-data.component.scss']
})
export class UsersDataComponent implements OnInit {

  formCandidateData!: FormGroup;
  formCompanyData!: FormGroup;
  user: User = new User();
  address: Address = new Address();
  isConfirmed: boolean = false;
  userId: number;
  isCandidate: boolean;
  schoolings!: Schooling[];
  situations!: Situation[];
  schoolingSelected: number = 0;
  situationSelected: number = 0;
  companySize!: string;
  @Output() sendUserEvent = new EventEmitter<User>();

  constructor(private router: ActivatedRoute, private userService: UserService, private schoolingService: SchoolingService, private situationService: SituationService) {

  }

  async ngOnInit() {



    this.userId = this.router.snapshot.params?.['userId'];

    if (this.router.snapshot.params?.['user'] === 'candidato') {
      this.isCandidate = true;
      this.createFormCandidateDataValidation();
      this.getSchoolings()
      this.getSituations();
    }
    else {
      this.isCandidate = false;
      this.createFormCompanyDataValidation();
    }
    console.log(this.userId)

    if (this.userId) {

      if (this.isCandidate) {

        await this.userService.getCandidateInfoById(this.userId).subscribe(user => {
          
          console.log(user)
          
          this.user.userName = user[0].nome;
          this.user.cpf = user[0].cpf;
          this.user.id = user[0].id;
          this.user.creationDate = this.formatDate(user[0].dataCadastro);
          this.user.birthDate = this.formatDate(user[0].dataNascimento);
          this.schoolingSelected = user[0].idEscolaridade;
          this.situationSelected = user[0].idSituacaoEmpregaticia;

        });

        
      }
      else{

        await this.userService.getCompanyInfoById(this.userId).subscribe(company => {
          
          console.log(company)
          
          this.user.id = company[0].id;
          this.user.profile = company[0].nomeFantasia;
          this.user.userName = company[0].razaoSocial;
          this.user.cnpj = company[0].cnpj;
          this.user.companyArea = company[0].ramoAtuacao;
          this.user.companyPort = company[0].porte;

        });

      }

    }

  }

  formatDate(date: string): string{

    date = `${date.split('-')[0]}-${date.split('-')[1]}-${date.split('-')[2][0]}${date.split('-')[2][1]}`;

    return date;

  }

  async getSchoolings() {

    await this.schoolingService.getSchoolings().subscribe(data => {
      this.schoolings = data


    });


  }

  async getSituations(){

    await this.situationService.getSituations().subscribe(data => {
      this.situations = data
    })
  }

  changeSchooling(schoolId: number) {

    this.user.schoolingId = schoolId;


  }

  changeSituation(situationId: number){

    this.user.situationId = situationId;
    
  }

  changeCompanySize(size: string) {

    this.user.companyPort = size;

  }


  createFormCandidateDataValidation(): void {
    this.formCandidateData = new FormGroup({
      userName: new FormControl(this.user.userName, [
        Validators.required
      ]),
      profileName: new FormControl(this.user.profile, [
        Validators.required
      ]),
      email: new FormControl(this.user.email, [
        Validators.required
      ]),
      cpf: new FormControl(this.user.cpf, [
        Validators.required
      ]),
      passWord: new FormControl(this.user.passWord, [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')
      ]),
      birthDate: new FormControl(this.user.birthDate, [
        Validators.required,
      ]),
      age: new FormControl(this.user.age, [
        Validators.required,
      ]),
      district: new FormControl(this.address.district, [
        Validators.required,
      ]),
      zipCode: new FormControl(this.address.zipCode, [
        Validators.required,
      ]),
      streetName: new FormControl(this.address.streetName, [
        Validators.required,
      ]),
      streetNumber: new FormControl(this.address.streetNumber, [
        Validators.required,
      ]),
      contact: new FormControl(this.user.phone, [
        Validators.required,
      ]),

    });

  }


  createFormCompanyDataValidation(): void {
    this.formCompanyData = new FormGroup({
      profileName: new FormControl(this.user.profile, [
        Validators.required
      ]),
      companyName: new FormControl(this.user.userName, [
        Validators.required
      ]),
      email: new FormControl(this.user.email, [
        Validators.required
      ]),
      cnpj: new FormControl(this.user.cnpj, [
        Validators.required
      ]),
      companyArea: new FormControl(this.user.companyArea, [
        Validators.required
      ]),
      passWord: new FormControl(this.user.passWord, [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')
      ]),
      district: new FormControl(this.address.district, [
        Validators.required,
      ]),
      zipCode: new FormControl(this.address.zipCode, [
        Validators.required,
      ]),
      streetName: new FormControl(this.address.streetName, [
        Validators.required,
      ]),
      streetNumber: new FormControl(this.address.streetNumber, [
        Validators.required,
      ]),
      contact: new FormControl(this.user.phone, [
        Validators.required,
      ]),
    });

  }

  validateConfirmPassword() {

    let confirmPassword = (<HTMLInputElement>(document.getElementById('confirmPassword'))).value;

    console.log(this.user.passWord)
    console.log(confirmPassword)

    this.isConfirmed = this.user.passWord === confirmPassword ? false : true;

    return this.isConfirmed;

  }

  sendUserData() {

    if (this.validateConfirmPassword())
      return;

    if (this.isCandidate) {
      console.log(this.formCandidateData.valid)
      if (!this.formCandidateData.valid)
        return;
    }
    else {

      if (!this.formCompanyData.valid)
        return;

    }

    this.user.address = this.address;
    this.user.schoolingId = this.schoolingSelected;
    this.user.situationId = this.situationSelected;

    console.log(this.user)

    this.sendUserEvent.emit(this.user);

  }

}
