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

    console.log(skillPercentualList)

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
        r:{
          grid:{
            color: 'white'
          }
        }
       }
       
       
      }
    });

  }

}
