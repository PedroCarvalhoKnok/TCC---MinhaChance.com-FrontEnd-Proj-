import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { CoursesListComponent } from './courses-component/courses-list/courses-list.component';
import { CoursesRegisterComponent } from './courses-component/courses-register/courses-register.component';
import { VacanciesListComponent } from './vacancies-component/vacancies-list/vacancies-list.component';
import { VacanciesDetailsComponent } from './vacancies-component/vacancies-details/vacancies-details.component';
import { VacanciesRegisterComponent } from './vacancies-component/vacancies-register/vacancies-register.component';
import { SkillsTestComponent } from './skills-test-component/skills-test/skills-test.component';
import { SkillsResultComponent } from './skills-test-component/skills-result/skills-result.component';
import { SkillsStartComponent } from './skills-test-component/skills-start/skills-start.component';
import { UsersProfileComponent } from './users-component/users-profile/users-profile.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { UsersRegisterComponent } from './users-component/users-register/users-register.component';
import { AuthGuard } from './Helpers/auth.guard';
import { Role } from './Enums/role';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponentComponent
  },
  {
    path: 'curso/buscar',
    component: CoursesListComponent
  },
  {
    path: 'empresa/curso',
    component: CoursesRegisterComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Company] }
  }
  ,
  {
    path: 'empresa/curso/:courseId',
    component: CoursesRegisterComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Company] }
  },
  {
    path: 'vagas/buscar',
    component: VacanciesListComponent
  },
  {
    path: 'empresa/vagas/detalhes/:vacancyId',
    component: VacanciesDetailsComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Company] }
  },
  {
    path: 'empresa/vagas/cadastrar',
    component: VacanciesRegisterComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Company] }
  },
  {
    path: 'empresa/vagas/editar/:vacancyId',
    component: VacanciesRegisterComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Company] }
  },
  {
    path: 'candidato/:userId/teste',
    component: SkillsTestComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Candidate] }
  },
  {
    path: 'candidato/:userId/teste/resultado',
    component: SkillsResultComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Candidate] }
  },
  {
    path: 'candidato/:userId/teste/inicio',
    component: SkillsStartComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Candidate] }
  },
  {
    path: ':userId/perfil',
    component: UsersProfileComponent
  },
  {
    path: ':user/login',
    component: LoginComponentComponent
  },
  {
    path: ':user/cadastrar',
    component: UsersRegisterComponent
  },
  {
    path: ':user/editar/:userId',
    component: UsersRegisterComponent
  },
  
  { path: '**', redirectTo: 'home' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
