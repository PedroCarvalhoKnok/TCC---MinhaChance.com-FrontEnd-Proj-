import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills-result',
  templateUrl: './skills-result.component.html',
  styleUrls: ['./skills-result.component.scss']
})
export class SkillsResultComponent implements OnInit {

  constructor() { }

  userSkillsByIntelligence: any = [
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

  ngOnInit(): void {
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
