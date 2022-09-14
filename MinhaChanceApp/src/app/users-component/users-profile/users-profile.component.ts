import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/Models/Course/Course';
import { User } from 'src/app/Models/User/User';
import { Vacancy } from 'src/app/Models/Vacancy/Vacancy';
import { TestService } from 'src/app/Services/Test/test.service';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.scss']
})
export class UsersProfileComponent implements OnInit {

  userLogged: User;

  userBestVacancies: Vacancy[];

  userBestCourses: Course[];

  userSkillsByIntelligence: any[] = [
    {
      name: 'inteligencia1',
      skill: 10,
    },
    {
      name: 'inteligencia2',
      skill: 20,
    },
    {
      name: 'inteligencia3',
      skill: 30,
    },
    {
      name: 'inteligencia4',
      skill: 40,
    },
    {
      name: 'inteligencia5',
      skill: 50,
    },
    {
      name: 'inteligencia6',
      skill: 60,
    },
    {
      name: 'inteligencia7',
      skill: 70,
    },
    {
      name: 'inteligencia8',
      skill: 10,
    },

  ];

  constructor(private userService: UserService,private testService:TestService, private router: ActivatedRoute) { }

  async ngOnInit(){

    let userId = this.router.snapshot.params?.['userId'];


    if(userId != undefined){

      await this.userService.getUserInfoById(userId).subscribe(user => { this.userLogged = user});

      await this.testService.getUserTestResults(userId).subscribe(results => { this.userSkillsByIntelligence = results})

      await this.userService.getBestVacanciesById(userId).subscribe(vacancies => { this.userBestVacancies = vacancies})

      await this.userService.getBestCoursesById(userId).subscribe(courses => { this.userBestCourses = courses})
      
    }
  }


  goToLink(url: string){
    window.open(url, "_blank");
}

}
