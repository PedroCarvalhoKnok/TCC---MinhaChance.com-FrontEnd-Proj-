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

  userSkillsByIntelligence: any = [];

  firstSkill: string;

  remainingSkills: string = '';

  bestIndicatedArea!: string;

  bestIndicatedProfessions!: string;

  userName: string = 'teste';

  async ngOnInit() {

    let userId = this.router.snapshot.params?.['userId'];


    let sortedSkills: any = []

    await this.userService.getCandidateInfoById(userId).subscribe(async user => {

      await this.testService.getUserTestResults(user[0].idTesteIM).subscribe(imResult => {
        this.userSkillsByIntelligence = imResult[0];
        console.log(this.userSkillsByIntelligence)
        sortedSkills.push({ intelligenceType: 'cinestesica', result: this.userSkillsByIntelligence.cinestesica })
        sortedSkills.push({ intelligenceType: 'espacial', result: this.userSkillsByIntelligence.espacial })
        sortedSkills.push({ intelligenceType: 'interpessoal', result: this.userSkillsByIntelligence.interpessoal })
        sortedSkills.push({ intelligenceType: 'intrapessoal', result: this.userSkillsByIntelligence.intrapessoal })
        sortedSkills.push({ intelligenceType: 'linguistica', result: this.userSkillsByIntelligence.espacial })
        sortedSkills.push({ intelligenceType: 'matematica', result: this.userSkillsByIntelligence.matematica })
        sortedSkills.push({ intelligenceType: 'musical', result: this.userSkillsByIntelligence.musical })

        sortedSkills = this.sortSkillList(sortedSkills);

        this.setFirstSkill(sortedSkills);

        this.setRemainingSkills(sortedSkills);

        console.log(this.firstSkill)

        console.log(this.remainingSkills)

      })

    });

    // if (userId) {
    //   await this.testService.getUserTestResults(userId).subscribe(results => {
    //     this.userSkillsByIntelligence = results;
    //   })

    //   await this.userService.getUserNameById(userId).subscribe(userName =>{
    //     this.userName = userName;
    //   })
    // }

    // this.userSkillsByIntelligence = this.sortSkillList(this.userSkillsByIntelligence);

    // this.firstSkill = this.userSkillsByIntelligence[0];

    // this.remainingSkills = this.listRemainingSkills(this.userSkillsByIntelligence);

  }

  setFirstSkill(skillsList) {

    this.firstSkill = skillsList[0].intelligenceType;

  }

  setRemainingSkills(skillsList) {

    skillsList.splice(0, 1);

    for (const [index, value] of skillsList.entries()) {

      if (index == 0)
        this.remainingSkills += `${value.intelligenceType}, `;

      if (index == skillsList.length - 1)
        this.remainingSkills += ` e ${value.intelligenceType}`;

      else
        this.remainingSkills += `, ${value.intelligenceType}`;

    }

  }


  sortSkillList(skillList) {

    return skillList.sort(function (first, second) {
      return second.result - first.result;
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
