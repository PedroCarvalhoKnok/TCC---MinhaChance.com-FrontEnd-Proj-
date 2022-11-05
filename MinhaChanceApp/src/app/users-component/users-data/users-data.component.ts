import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Address } from 'src/app/Models/User/Address';
import { Schooling } from 'src/app/Models/User/Schooling';
import { Situation } from 'src/app/Models/User/Situation';
import { User } from 'src/app/Models/User/User';
import { LocationService } from 'src/app/Services/Location/location.service';
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
  states!: any[];
  counties!: any[];
  stateSelected: string;
  countySelected: string;
  schoolingSelected: number = 0;
  situationSelected: number = 0;
  companySize!: string;
  @Output() sendUserEvent = new EventEmitter<User>();

  constructor(private router: ActivatedRoute, private userService: UserService, private schoolingService: SchoolingService, private situationService: SituationService, private locationService: LocationService) {

  }

  async ngOnInit() {



    this.userId = this.router.snapshot.params?.['userId'];

    if (this.router.snapshot.params?.['user'] === 'candidato') {
      this.isCandidate = true;
      this.createFormCandidateDataValidation();
      await this.getSchoolings()
      await this.getSituations();
    }
    else {
      this.isCandidate = false;
      this.createFormCompanyDataValidation();
    }
    console.log(this.userId)

    await this.getStates();

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
      else {

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

  formatDate(date: string): string {

    date = `${date.split('-')[0]}-${date.split('-')[1]}-${date.split('-')[2][0]}${date.split('-')[2][1]}`;

    return date;

  }

  async getSchoolings() {

    await this.schoolingService.getSchoolings().subscribe(data => {
      this.schoolings = data


    });


  }

  async getStates() {

    await this.locationService.getLocationStates().subscribe(data => {
      console.log(data)
      this.states = data

    });


  }

  async changeState(stateId: number) {

    this.stateSelected = this.states.find(state => state.id === stateId).nome;
    this.address.state = this.stateSelected;
    this.countySelected = '';

    await this.locationService.getLocationCountiesByState(stateId).subscribe(counties => {
      console.log(counties)
      this.counties = counties;
    })

  }

  changeCounty(county: string) {

    console.log(county)
    console.log(this.stateSelected)
    this.countySelected = county;
    this.address.county = this.countySelected;

  }

  async getSituations() {

    await this.situationService.getSituations().subscribe(data => {
      this.situations = data
    })
  }

  changeSchooling(schoolId: number) {

    this.user.schoolingId = schoolId;


  }

  changeSituation(situationId: number) {

    this.user.situationId = situationId;

  }

  changeCompanySize(size: string) {

    this.user.companyPort = size;

  }

  async findZipCode(zipCode: string){

    console.log(zipCode)

    await this.locationService.getAddressByZipCode(zipCode).subscribe(async address => {

      console.log(address)

      this.address.streetName = address.logradouro;
      this.address.district = address.bairro;
      this.stateSelected = this.states.find(state => state.sigla === address.uf).nome;
      this.address.state = this.stateSelected

      await this.locationService.getLocationCountiesByState(this.states.find(state => state.sigla === address.uf).id).subscribe(counties => {

        this.counties = counties;

        this.countySelected = counties.find(county => county.nome === address.localidade).nome;
        this.address.county = this.countySelected
        
      })


    })

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
