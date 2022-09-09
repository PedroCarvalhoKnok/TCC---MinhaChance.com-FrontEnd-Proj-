import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestService } from 'src/app/Services/Test/test.service';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-skills-result',
  templateUrl: './skills-result.component.html',
  styleUrls: ['./skills-result.component.scss']
})
export class SkillsResultComponent implements OnInit {

  constructor(private router: ActivatedRoute, private testService: TestService, private userService: UserService) { }

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

  firstSkill!: string;

  remainingSkills!: string;

  bestIndicatedArea!: string;

  bestIndicatedProfessions!: string;

  userName: string;

  async ngOnInit() {

    let userId = this.router.snapshot.params?.['userId'];

    if (userId) {
      await this.testService.getUserTestResults(userId).subscribe(results => {
        this.userSkillsByIntelligence = results;
      })

      await this.userService.getUserNameById(userId).subscribe(userName =>{
        this.userName = userName;
      })
    }

    this.userSkillsByIntelligence = this.sortSkillList(this.userSkillsByIntelligence);

    this.firstSkill = this.userSkillsByIntelligence[0];

    this.remainingSkills = this.listRemainingSkills(this.userSkillsByIntelligence);

  }


  sortSkillList(skillList) {

    return skillList.sort(function (first, second) {
      return second.skill - first.skill;
    });

  }

  listRemainingSkills(skillList: any[]) {
    let formattedSkills = ''
    skillList.forEach(function (skill, index) {
      if (index === 0) {
        return;
      }

      formattedSkills = index != skillList.length - 1 ? formattedSkills + `${skill}, ` : formattedSkills + `${skill}`;

    });

    return formattedSkills;
  }

  fillBestIndicationAreaProfession(bestSkill) {

    switch (bestSkill.name) {
      case 'inteligencia1':
        this.bestIndicatedArea = 'Exatas'
        this.bestIndicatedProfessions = 'voltadas ao exercício do raciocínio e aplicação da lógica e da matemática para problemas do dia a dia, como: Engenharia, matemática, física, química...';
        break;
      case 'inteligencia2':
        this.bestIndicatedArea = 'Linguística'
        this.bestIndicatedProfessions = 'voltadas à comunicação entre pessoas e aprendizado de linguas distintas, como: Letras, comunicação social, dublagem, tradução...';
        break;

    }

  }

}
