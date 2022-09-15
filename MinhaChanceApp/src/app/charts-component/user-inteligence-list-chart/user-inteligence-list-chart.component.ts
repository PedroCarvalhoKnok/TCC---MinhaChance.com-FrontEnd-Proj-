import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { User } from 'src/app/Models/User/User';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables)

@Component({
  selector: 'app-user-inteligence-list-chart',
  templateUrl: './user-inteligence-list-chart.component.html',
  styleUrls: ['./user-inteligence-list-chart.component.scss']
})
export class UserInteligenceListChartComponent implements OnInit {

  @Input() userIntelligenceVacancyRecommendations!: User;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    console.log(this.userIntelligenceVacancyRecommendations.id)

    new Chart(`${this.userIntelligenceVacancyRecommendations.id + 1}`, {
      type: 'bar',
      data: { labels: 
        this.userIntelligenceVacancyRecommendations.userInteligenciesInfo.vacancies
      ,
      datasets:[{
        label: 'Area',
        data: this.userIntelligenceVacancyRecommendations.userInteligenciesInfo.skills,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 99, 132)',
          'rgb(255, 99, 132)',
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

}
