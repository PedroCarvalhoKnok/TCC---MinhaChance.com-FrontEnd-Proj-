import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { User } from 'src/app/Models/User/User';

Chart.register(...registerables)

@Component({
  selector: 'app-user-inteligence-details-chart',
  templateUrl: './user-inteligence-details-chart.component.html',
  styleUrls: ['./user-inteligence-details-chart.component.scss']
})
export class UserInteligenceDetailsChartComponent implements OnInit {

  userIntelligenceVacancyRecommendations!: User[];

  constructor() { }

  ngOnInit(): void {
    new Chart('destaque', {
      type: 'bar',
      data: { labels: [
        'Titulo vaga 1',
        'Titulo vaga 2',
        'Titulo vaga 3',
      ],
      datasets:[{
        label: 'Area',
        data: [80, 76, 64],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
    });
  }

  receiveUserSkills($event){

    this.userIntelligenceVacancyRecommendations = $event

  }
}
