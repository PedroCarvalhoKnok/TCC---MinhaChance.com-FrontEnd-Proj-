import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { CoursesListComponent } from './courses-component/courses-list/courses-list.component';
import { CoursesRegisterComponent } from './courses-component/courses-register/courses-register.component';
import { VacanciesListComponent } from './vacancies-component/vacancies-list/vacancies-list.component';
import { VacanciesDetailsComponent } from './vacancies-component/vacancies-details/vacancies-details.component';
import { VacanciesRegisterComponent } from './vacancies-component/vacancies-register/vacancies-register.component';
import { SkillsTestComponent } from './skills-test-component/skills-test/skills-test.component';

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
    path: 'candidato/teste',
    component: SkillsTestComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
