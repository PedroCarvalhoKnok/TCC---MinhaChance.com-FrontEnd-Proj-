import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { User } from 'src/app/Models/User/User';
import { Chart, registerables } from 'chart.js';
import { TestService } from 'src/app/Services/Test/test.service';

Chart.register(...registerables)

@Component({
  selector: 'app-user-inteligence-list-chart',
  templateUrl: './user-inteligence-list-chart.component.html',
  styleUrls: ['./user-inteligence-list-chart.component.scss']
})
export class UserInteligenceListChartComponent implements OnInit {

  @Input() userIntelligenceVacancyRecommendations: any = {};

  skillPercentualList: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

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

    console.log(this.skillPercentualList)

    console.log(this.userIntelligenceVacancyRecommendations.id)

    new Chart(`${this.userIntelligenceVacancyRecommendations.id + 1}`, {
      type: 'radar',
      data: {
        labels:
          skillNameList
        ,
        datasets: [{
          label: 'Vaga',
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
