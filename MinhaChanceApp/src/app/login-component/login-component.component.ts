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
  formLogin!: FormGroup;
  userRole: string;
  isCandidate: boolean;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {
    if (this.authenticationService.userValue) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {

    let user = this.route.snapshot.params?.['user'];

    this.userRole = user === 'candidato' ? 'Candidato': 'Empresa';
    this.isCandidate = user === 'candidato' ? true: false;

    this.createFormLoginValidation();
  }

  createFormLoginValidation(): void {
    this.formLogin = new FormGroup({
      cpf: new FormControl(this.cpf, [
        Validators.required
      ]),
      cnpj: new FormControl(this.cnpj, [
        Validators.required
      ]),
      userPassword: new FormControl(this.passWord, [
        Validators.required,
      ])
    });

  }

  async onLogin() {

    if (this.formLogin.invalid) {
      return;
    }

    let userDoc: string = this.userRole === 'candidato' ? this.cpf: this.cnpj;

    this.authenticationService.login(userDoc, this.passWord)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['/home'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          Swal.fire(
            `${error}`,
            'Tente novamente',
            'warning'
          )
        }
      });

  }

}
