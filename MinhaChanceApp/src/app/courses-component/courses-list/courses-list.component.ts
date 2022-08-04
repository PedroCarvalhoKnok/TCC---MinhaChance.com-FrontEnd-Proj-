import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/Models/Course/Course';
import { Test } from 'src/app/Models/Test/Test';
import {PageEvent} from '@angular/material/paginator';
import { Observable, of } from 'rxjs';
import { courseFilter } from 'src/app/Models/Filters/Course/courseFilter';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  pageEvent!: PageEvent;
  showCertificationTitle: boolean = false;
  showTestTitle: boolean = false;
  filters: courseFilter = new courseFilter();

  test: Test = {id: 1, certificationId: 1, durationTime: '1 Hora', difficulty: 'Iniciante', questionsQuantity: 9, approvalPercentual: '50%'}
  test2: Test = {id: 2, certificationId: 0, durationTime: '1 Hora', difficulty: 'Iniciante', questionsQuantity: 9, approvalPercentual: '50%'}
  
 categories: string[] = ['Construção', 'Tecnologia', 'Gestão'];

  courses: Observable<Course[]> = of([
    {id: 1,sessionsQuantity: 4,certificationId: 1,test: this.test, description: 'Curso introdutório ao Python',courseTitle: 'Introdução Python I',creationDate: '19/07/2022',subscribeQuantity: 100, durationTime: '7 Horas'},
    {id: 2,sessionsQuantity: 3,certificationId: undefined,test: this.test2, description: 'Curso Ruby I',courseTitle: 'Introdução Ruby I',creationDate: '19/07/2022',subscribeQuantity: 100, durationTime: '7 Horas'},
    {id: 3,sessionsQuantity: 2,certificationId: 2,test: undefined, description: 'Curso Ruby II',courseTitle: 'Introdução Ruby II',creationDate: '19/07/2022',subscribeQuantity: 10, durationTime: '9 Horas'},
  ]);

  constructor() { }

  ngOnInit(): void {
  }

  changeShowCertification(){
    this.showCertificationTitle = true;
    this.filters.hasCertification = true;
  }

  changeHideCertification(){
    this.showCertificationTitle = false;
    this.filters.hasCertification = false;
  }
  changeShowTest(){
    this.showTestTitle = true;
    this.filters.hasTest = true;
  }

  changeHideTest(){
    this.showTestTitle = false;
    this.filters.hasTest = false;
  }

  changeCategoryFilter(category: string){
    this.filters.courseCategory = category;
  }

  changeLinkedVacancies(hasLink: boolean){
    this.filters.hasVacancyLink = hasLink ? true: false;
  }

  difficultyRateChange(rate: number){

    //switch

  }

  difficultyTestRateChange(rate: number){

    //switch

  }

  testDuration(event: any){
    this.filters.testDuration = event.value;
    
  }

  async applyFiltersCourses(){
    

  }

}
