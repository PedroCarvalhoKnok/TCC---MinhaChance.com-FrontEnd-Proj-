import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables)

@Component({
  selector: 'app-user-inteligence-result-chart',
  templateUrl: './user-inteligence-result-chart.component.html',
  styleUrls: ['./user-inteligence-result-chart.component.scss']
})
export class UserInteligenceResultChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    new Chart(`user-intelligence-result`, {
      type: 'radar',
      data: {
        labels:
          [
            'inteligencia 1',
            'inteligencia 2',
            'inteligencia 3',
            'inteligencia 4',
            'inteligencia 5',
            'inteligencia 6',
            'inteligencia 7',
            'inteligencia 8',
          ]
        ,
        datasets: [{
          label: 'usuario 1',
          data: [65, 59, 90, 81, 56, 55, 40, 78],
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
