import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/Models/Course/Course';
import { Test } from 'src/app/Models/Test/Test';

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

  test: Test = {id: 1, certificationId: 1, durationTime: '1 Hora', difficulty: 'Iniciante', questionsQuantity: 9}

  courses: Course[] = [
    {id: 1,sessionsQuantity: 4,certificationId: 1,test: this.test, description: 'Curso introdutório ao Python',courseTitle: 'Introdução Python I',creationDate: '19/07/2022',subscribeQuantity: 100, durationTime: '7 Horas'},
    
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
