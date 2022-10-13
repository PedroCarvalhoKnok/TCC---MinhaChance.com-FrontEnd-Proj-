import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/User/User';
import { UserService } from 'src/app/Services/User/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-register',
  templateUrl: './users-register.component.html',
  styleUrls: ['./users-register.component.scss']
})
export class UsersRegisterComponent implements OnInit {

  user: User = new User();
  isCandidate!: boolean;
  userId: number;
  actualDate!: Date;

  constructor(private userService: UserService, private router: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {

    this.isCandidate = this.router.snapshot.params?.['user'] === 'candidato' ? true : false;

    this.userId = this.router.snapshot.params?.['userId'];

  }

  bindUserData(data: User) {
    this.user = data;
  }

  bindUserDetails(details: User) {

    this.user.objective = details.objective;
    this.user.salaryPretension = details.salaryPretension;
    this.user.isWorking = details.isWorking;
    this.user.actualCharge = details.actualCharge;
    this.user.actualCompany = details.actualCompany;

    this.user.experiences = details.experiences;
    this.user.graduations = details.graduations;
    this.user.certifications = details.certifications;

  }

  bindUserInterests(interests: User) {

    this.user.interests = interests.interests;

  }

  formatMonth(mes: number): string{

    let mesFormatted = mes < 10 ? `0${mes}` : mes.toString();

    return mesFormatted;

  }

  formatCreationDate(){

    this.actualDate = new Date();
    var data =
    this.actualDate.getDate() +
      "/" +
      this.formatMonth(this.actualDate.getMonth() + 1) +
      "/" +
      this.actualDate.getFullYear() +
      " " +
      this.actualDate.getHours() +
      ":" +
      this.actualDate.getMinutes() +
      ":" +
      this.actualDate.getSeconds();

    return data;
  }

  validateGoToUserTest(user: User) {

    Swal.fire({
      title: 'Deseja fazer o teste de mapeamento de aptidão?',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim!',
      cancelButtonText: 'Não!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.route.navigate([`${user.role}/${user.id}/teste/inicio`]);
      }
      else {
        this.route.navigate([`${user.role}/login`]);
      }
    })

  }

  async postCandidate() {

    this.user.creationDate = this.formatCreationDate();

    await this.userService.postCandidateRegister(this.user).subscribe(user => {
      user ?
        Swal.fire(
          'Sucesso!',
          `Dados cadastrados com sucesso!`,
          'success'
        ).then((result) => {

          if (result.isConfirmed)
            this.validateGoToUserTest(user);

        }) : Swal.fire(
          'Ops, ocorreu um erro!',
          `Ocorreu um erro ao criar o usuário, tente novamente!`,
          'warning'
        );
    })

  }

  async postCompany() {

    await this.userService.postCompanyRegister(this.user).subscribe(user => {
      user ?
        Swal.fire(
          'Sucesso!',
          `Dados cadastrados com sucesso!`,
          'success'
        ): Swal.fire(
          'Ops, ocorreu um erro!',
          `Ocorreu um erro ao criar o usuário, tente novamente!`,
          'warning'
        );
    })

  }

  async confirmPostUser() {

    Swal.fire({
      title: 'Deseja enviar os dados informados?',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim!',
      cancelButtonText: 'Não!'
    }).then(async (result) => {
      if (result.isConfirmed) {

        if (this.isCandidate)
          await this.postCandidate();
        else
          await this.postCompany();

      }
    })



  }

  async editCandidate() {

    await this.userService.editCandidate(this.user).subscribe(feedBack => {
      feedBack ?
        Swal.fire(
          'Sucesso!',
          `Dados editados com sucesso!`,
          'success'
        ) : Swal.fire(
          'Ops, ocorreu um erro!',
          `Ocorreu um erro ao editar o usuário, tente novamente!`,
          'warning'
        );
    })

  }

  async editCompany() {

    await this.userService.editCompany(this.user).subscribe(feedBack => {
      feedBack ?
        Swal.fire(
          'Sucesso!',
          `Dados editados com sucesso!`,
          'success'
        ) : Swal.fire(
          'Ops, ocorreu um erro!',
          `Ocorreu um erro ao editar o usuário, tente novamente!`,
          'warning'
        );
    })

  }

  async confirmEditUser() {

    Swal.fire({
      title: 'Deseja editar seus dados?',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim!',
      cancelButtonText: 'Não!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (this.isCandidate)
          await this.editCandidate();
        else
          await this.editCompany();
      }
    })


  }


}
