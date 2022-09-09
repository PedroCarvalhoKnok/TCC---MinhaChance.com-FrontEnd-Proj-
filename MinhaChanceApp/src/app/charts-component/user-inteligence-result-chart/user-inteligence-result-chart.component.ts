import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables)

@Component({
  selector: 'app-user-inteligence-result-chart',
  templateUrl: './user-inteligence-result-chart.component.html',
  styleUrls: ['./user-inteligence-result-chart.component.scss']
})
export class UserInteligenceResultChartComponent implements OnInit {

  @Input() userResultSkills!: any[];

  @Input() userName!: string;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    let skillNameList: any = []
    let skillPercentualList: any = []

    this.userResultSkills.forEach(skill => {
      skillNameList.push(skill.name)
      skillPercentualList.push(skill.skill);
    })

    new Chart(`user-intelligence-result`, {
      type: 'radar',
      data: {
        labels:
          skillNameList
        ,
        datasets: [{
          label: this.userName,
          data: skillPercentualList,
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
      }
    });

  }

}
