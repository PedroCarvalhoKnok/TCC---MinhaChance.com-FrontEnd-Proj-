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
  ];
  

  displayedColumns: string[] = ['firstRow', 'secondRow', 'thirdRow', 'forthRow', 'fifthRow'];
  dataSource = new MatTableDataSource(this.data);

  constructor() { }

  ngOnInit(): void {
    
  }

}
