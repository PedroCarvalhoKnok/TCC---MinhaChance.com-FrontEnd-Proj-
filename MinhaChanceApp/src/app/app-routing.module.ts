import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { CoursesListComponent } from './courses-component/courses-list/courses-list.component';
import { CoursesRegisterComponent } from './courses-component/courses-register/courses-register.component';
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
