import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { User } from 'src/app/Models/User/User';


@Component({
  selector: 'app-user-vacancy-list-chart',
  templateUrl: './user-vacancy-list-chart.component.html',
  styleUrls: ['./user-vacancy-list-chart.component.scss']
})
export class UserVacancyListChartComponent implements AfterViewInit {


  @Input() user: any = 0;

  constructor() { }

  ngAfterViewInit(): void {

    let no = (100 - this.user);

    console.log(no);

    new Chart(`${this.user + 3}`, {
      type: 'pie',
      data: {
        labels: [
          'Não',
          'Sim',
        ],
        datasets: [{
          label: 'Aptidão Candidato X Vaga',
          data: [no, this.user],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
          ],
          hoverOffset: 4
        }]
      }
    });
  }

}
