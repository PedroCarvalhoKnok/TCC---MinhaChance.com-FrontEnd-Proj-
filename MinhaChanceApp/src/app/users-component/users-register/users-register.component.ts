import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/User/User';
import { UserService } from 'src/app/Services/User/user.service';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private userService: UserService, private router: ActivatedRoute) { }

  ngOnInit(): void {

    this.isCandidate = this.router.snapshot.params?.['user'] === 'candidato' ? true: false;
    
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

  async postUser() {

    await this.userService.postUserRegister(this.user).subscribe(feedBack => {
      feedBack ?
        Swal.fire(
          'Sucesso!',
          `Dados cadastrados com sucesso!`,
          'success'
        ) : Swal.fire(
          'Ops, ocorreu um erro!',
          `Ocorreu um erro ao criar o usuário, tente novamente!`,
          'warning'
        );
    })


  }

  async editUser() {

    await this.userService.editUser(this.user).subscribe(feedBack => {
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




}
