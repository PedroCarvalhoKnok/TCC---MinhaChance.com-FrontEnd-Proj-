import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { User } from 'src/app/Models/User/User';

Chart.register(...registerables)

@Component({
  selector: 'app-user-inteligence-details-chart',
  templateUrl: './user-inteligence-details-chart.component.html',
  styleUrls: ['./user-inteligence-details-chart.component.scss']
})
export class UserInteligenceDetailsChartComponent implements AfterViewInit {

  @Input() userIntelligenceVacancyRecommendations!: User;

  constructor() { }
  

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
