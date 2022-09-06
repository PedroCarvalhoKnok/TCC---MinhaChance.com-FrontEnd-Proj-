import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-skills-test',
  templateUrl: './skills-test.component.html',
  styleUrls: ['./skills-test.component.scss']
})
export class SkillsTestComponent implements OnInit {

    data: any[] = [
    {firstRow: 1, secondRow: 2, thirdRow: 3, forthRow: 4, fifthRow: 5},
    {firstRow: 6, secondRow: 7, thirdRow: 8, forthRow: 9, fifthRow: 10},
    {firstRow: 11, secondRow: 12, thirdRow: 13, forthRow: 14, fifthRow: 15},
    {firstRow: 16, secondRow: 17, thirdRow: 18, forthRow: 19, fifthRow: 20},
    {firstRow: 21, secondRow: 22, thirdRow: 23, forthRow: 24, fifthRow: 25},
    {firstRow: 26, secondRow: 27, thirdRow: 28, forthRow: 29, fifthRow: 30},
    {firstRow: 31, secondRow: 32, thirdRow: 33, forthRow: 34, fifthRow: 35},
    {firstRow: 36, secondRow: 37, thirdRow: 38, forthRow: 39, fifthRow: 40},
    {firstRow: 41, secondRow: 42, thirdRow: 43, forthRow: 44, fifthRow: 45},
  ];
  
  heigthProp: string = '1:0.6';

  constructor() { }

  ngOnInit(): void {
    
    
  }

  handleSize(event) {
    if(event.target.innerWidth < 1000)
      this.heigthProp = '1:0.6'
    if(event.target.innerWidth >= 800 && event.target.innerWidth <= 1000)
      this.heigthProp = '1:0.8'

    if(event.target.innerWidth >= 600 && event.target.innerWidth <= 800) 
      this.heigthProp = '1:1';

    if(event.target.innerWidth >= 400 && event.target.innerWidth <= 600) 
      this.heigthProp = '1:1.3';
    
    if(event.target.innerWidth >= 200 && event.target.innerWidth <= 400) 
      this.heigthProp = '1:1.7';
   
    
  }

  scrollToElement(id){

    console.log(id);
    (<HTMLInputElement>document.getElementById(`question${id}`)).scrollIntoView({
      behavior: "smooth",
      block: "start", 
      inline: "nearest"
    });

  }

}
