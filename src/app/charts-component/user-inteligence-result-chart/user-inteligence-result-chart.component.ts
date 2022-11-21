import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { TestService } from 'src/app/Services/Test/test.service';
import { UserService } from 'src/app/Services/User/user.service';

Chart.register(...registerables)

@Component({
  selector: 'app-user-inteligence-result-chart',
  templateUrl: './user-inteligence-result-chart.component.html',
  styleUrls: ['./user-inteligence-result-chart.component.scss']
})
export class UserInteligenceResultChartComponent {

  @Input() userResultSkills!: any;

  skillPercentualList: any[] = [];

  @Input() userName!: string;

  constructor(private router: ActivatedRoute, private testService: TestService, private userService: UserService) { }

  async ngAfterViewInit(){

    let skillNameList: any = ['cinestesica', 'espacial', 'interpessoal', 'intrapessoal', 'linguistica', 'matematica', 'musical', 'naturalista']

    let userId = this.router.snapshot.params?.['userId'];


    await this.userService.getCandidateInfoById(userId).subscribe(async user => {

      await this.testService.getUserTestResults(user[0].idTesteIM).subscribe(imResult => {
        console.log(imResult)

        this.skillPercentualList.push(imResult[0].cinestesica);
        this.skillPercentualList.push(imResult[0].espacial);
        this.skillPercentualList.push(imResult[0].interpessoal);
        this.skillPercentualList.push(imResult[0].intrapessoal);
        this.skillPercentualList.push(imResult[0].linguistica);
        this.skillPercentualList.push(imResult[0].matematica);
        this.skillPercentualList.push(imResult[0].musical);
        this.skillPercentualList.push(imResult[0].naturalista);


        new Chart(`user-intelligence-result`, {
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
                },
                pointLabels: {
                  color: '#D9D9D9',
                  font: {
                    size: 15
                  }
                }
              }

            }


          }
        });


      })

    });






  }

}
