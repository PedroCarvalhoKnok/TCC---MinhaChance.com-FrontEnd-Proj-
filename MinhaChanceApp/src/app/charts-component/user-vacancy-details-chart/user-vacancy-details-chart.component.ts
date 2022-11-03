import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { User } from 'src/app/Models/User/User';

Chart.register(...registerables)


@Component({
  selector: 'app-user-vacancy-details-chart',
  templateUrl: './user-vacancy-details-chart.component.html',
  styleUrls: ['./user-vacancy-details-chart.component.scss']
})
export class UserVacancyDetailsChartComponent implements AfterViewInit {

  @Input() user: any = 0;

  constructor() { }

  
  ngAfterViewInit(): void {


    this.user.no = (100 - this.user);

    console.log(this.user.no)

    new Chart(`${this.user.id + 3}`, {
      type: 'pie',
      data: {
        labels: [
          'Não',
          'Sim',
        ],
        datasets: [{
          label: 'Aptidão Candidato X Vaga',
          data: [this.user.no, this.user],
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
