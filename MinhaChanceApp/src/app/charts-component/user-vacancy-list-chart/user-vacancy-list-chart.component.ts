import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { User } from 'src/app/Models/User/User';


@Component({
  selector: 'app-user-vacancy-list-chart',
  templateUrl: './user-vacancy-list-chart.component.html',
  styleUrls: ['./user-vacancy-list-chart.component.scss']
})
export class UserVacancyListChartComponent implements OnInit {


  @Input() user!: User;

  constructor() { }

  ngOnInit(): void {

    new Chart(`${this.user.id + 3}`, {
      type: 'pie',
      data: {
        labels: [
          'Não',
          'Sim',
        ],
        datasets: [{
          label: 'Aptidão Candidato X Vaga',
          data: [this.user.userVacancyInfo.no, this.user.userVacancyInfo.yes],
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
