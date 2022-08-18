import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables)


@Component({
  selector: 'app-user-vacancy-details-chart',
  templateUrl: './user-vacancy-details-chart.component.html',
  styleUrls: ['./user-vacancy-details-chart.component.scss']
})
export class UserVacancyDetailsChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    new Chart("aptidao", {
      type: 'pie',
      data: {
        labels: [
          'Não',
          'Sim',
        ],
        datasets: [{
          label: 'Aptidão Candidato X Vaga',
          data: [60, 40],
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
