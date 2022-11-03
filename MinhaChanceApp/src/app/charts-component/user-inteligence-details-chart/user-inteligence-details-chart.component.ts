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

  @Input() userIntelligenceVacancyRecommendations: any = {};
  @Input() userName: any = '';

  skillPercentualList: any[] = [];

  constructor() { }


  ngAfterViewInit(): void {

    let skillNameList: any = ['cinestesica', 'espacial', 'interpessoal', 'intrapessoal', 'linguistica', 'matematica', 'musical', 'naturalista'];

    this.skillPercentualList.push(this.userIntelligenceVacancyRecommendations.cinestesica)
    this.skillPercentualList.push(this.userIntelligenceVacancyRecommendations.espacial)
    this.skillPercentualList.push(this.userIntelligenceVacancyRecommendations.interpessoal)
    this.skillPercentualList.push(this.userIntelligenceVacancyRecommendations.intrapessoal)
    this.skillPercentualList.push(this.userIntelligenceVacancyRecommendations.linguistica)
    this.skillPercentualList.push(this.userIntelligenceVacancyRecommendations.matematica)
    this.skillPercentualList.push(this.userIntelligenceVacancyRecommendations.musical)
    this.skillPercentualList.push(this.userIntelligenceVacancyRecommendations.naturalista)

    console.log(this.userIntelligenceVacancyRecommendations.id)

    new Chart(`${this.userIntelligenceVacancyRecommendations.id + 2}`, {
      type: 'radar',
      data: {
        labels:
          skillNameList
        ,
        datasets: [{
          label: this.userName,
          data: this.skillPercentualList,
          fill: true,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderColor: 'rgba(255, 255, 255)',
          pointBackgroundColor: 'rgba(255, 255, 255)',
          pointBorderColor: '#bf7575',
          pointHoverBackgroundColor: '#bf7575',
          pointHoverBorderColor: 'rgba(255, 255, 255)'
        }]
      },
      options: {
        color: 'white',
        scales: {
          r: {
            grid: {
              color: 'white'
            }
          }
        }
      }
    });

  }

}
