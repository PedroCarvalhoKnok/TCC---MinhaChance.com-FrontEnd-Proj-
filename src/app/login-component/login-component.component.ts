import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from '../Models/User/User';
import { AuthenticationService } from '../Services/Authentication/authentication.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent implements OnInit {

  cpf: string;
  cnpj: string;
  passWord: string;
  formLoginCandidate!: FormGroup;
  formLoginCompany!: FormGroup;
  userRole: string;
  isCandidate: boolean;
  hide: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private authService: AuthenticationService) {
    if (this.authenticationService.userValue) {
      this.router.navigate(['/home']);
    }
  }

  async ngOnInit() {

    let user = this.route.snapshot.params?.['user'];

    this.userRole = user === 'candidato' ? 'Candidato' : 'Empresa';
    this.isCandidate = user === 'candidato' ? true : false;

    if (this.isCandidate)
      this.createFormLoginCandidateValidation();
    else
      this.createFormLoginCompanyValidation();

    await this.authService.createJwtToken().subscribe(res => {

      console.log(res);
      sessionStorage.setItem('token', res.jwtToken);

    })

  }

  createFormLoginCandidateValidation(): void {
    this.formLoginCandidate = new FormGroup({
      cpf: new FormControl(this.cpf, [
        Validators.required
      ]),
      userPassword: new FormControl(this.passWord, [
        Validators.required,
      ])
    });

  }

  createFormLoginCompanyValidation(): void {
    this.formLoginCompany = new FormGroup({
      cnpj: new FormControl(this.cnpj, [
        Validators.required
      ]),
      userPassword: new FormControl(this.passWord, [
        Validators.required,
      ])
    });

  }

  async onLogin() {

    if (this.isCandidate) {

      if (this.formLoginCandidate.invalid) {
        return;
      }
    }
    else {

      if (this.formLoginCompany.invalid) {
        return;
      }

    }

    let userDoc: string = this.isCandidate ? this.cpf : this.cnpj;

    console.log(userDoc)
    console.log(this.passWord)

    this.authenticationService.login(userDoc, this.passWord)
      .pipe(first())
      .subscribe({
        next: (result) => {
          // get return url from query parameters or default to home page
          console.log(result)
          if (result === "Usuário ou senha inválidos") {
            //swal
            Swal.fire(
              `${result}`,
              'Tente novamente',
              'warning'
            )

            return;

          }
          sessionStorage.setItem('user', JSON.stringify(result));
          const returnUrl = this.route.snapshot.queryParams['/home'] || '/';
          this.router.navigateByUrl(returnUrl, { state: { login: true } });
        },
        error: error => {
          Swal.fire(
            `${error.message}`,
            'Tente novamente',
            'warning'
          )
        }
      });

  }

}
