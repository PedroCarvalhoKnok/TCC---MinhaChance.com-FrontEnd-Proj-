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

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponentComponent
  },
  {
    path: 'empresa/curso/buscar',
    component: CoursesListComponent
  },
  {
    path: 'empresa/curso',
    component: CoursesRegisterComponent
  }
  ,
  {
    path: 'empresa/curso/:courseId',
    component: CoursesRegisterComponent
  },
  {
    path: 'empresa/vagas/buscar',
    component: VacanciesListComponent
  },
  {
    path: 'empresa/vagas/detalhes/:vacancyId',
    component: VacanciesDetailsComponent
  },
  {
    path: 'empresa/vagas',
    component: VacanciesRegisterComponent
  },
  {
    path: 'empresa/vagas/:vacancyId',
    component: VacanciesRegisterComponent
  },
  {
    path: 'candidato/:userId/teste',
    component: SkillsTestComponent
  },
  {
    path: 'candidato/:userId/teste/resultado',
    component: SkillsResultComponent
  },
  {
    path: 'candidato/:userId/teste/inicio',
    component: SkillsStartComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
