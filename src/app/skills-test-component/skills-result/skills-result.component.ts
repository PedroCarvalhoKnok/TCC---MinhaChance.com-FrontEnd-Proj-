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

  description!: string;

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
        sortedSkills.push({ intelligenceType: 'naturalista', result: this.userSkillsByIntelligence.naturalista })

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

    this.fillBestIndicationAreaProfession(skillsList[0].intelligenceType);

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

    switch (bestSkill) {

      case 'cinestesica':
        this.bestIndicatedArea = 'Cinestesia'
        this.bestIndicatedProfessions = 'dançarino(a), demonstradores(as), atores(as), atletas, professores físicos, esportistas, soldados, bombeiros(as), socorristas, artistas de performance e ergonomistas';
        this.description = 'movimento e controle corporal, destreza manual, agilidade e balanceamento físico e coordenação do corpo e dos olhos'
        break;
      case 'espacial':
        this.bestIndicatedArea = 'Visuais/Design/Criação';
        this.bestIndicatedProfessions = 'artista, designer, cartunista, ilustrador(a), arquiteto(a), fotografo(a), escultor(a), urbanista e invertor(a)';
        this.description = 'visualização, percepção espacial, interpretação e criação de imagens visuais, imaginação de imagens e expressões, diferenciação de imagem e significado e espaço e efeito';
        break;
      case 'interpessoal':
        this.bestIndicatedArea = 'Comunicação/Contato Humano';
        this.bestIndicatedProfessions = 'psicólogo(a), terapeuta, profissional de RH, mediador(a), líder, político(a), educador(a), vendedor(a), professor(a), médico(a) e mentor(a).';
        this.description = 'habilidade de percepção de outra pessoa, interpretação de comportamentos e comunicações sociais, além da compreensão do relacionamento entre pessoas e situações externo a você.';
        break;
      case 'intrapessoal':
        this.bestIndicatedArea = 'Introspecção/Estudo interior';
        this.bestIndicatedProfessions = 'focado(a) na inteligência emocional e no processo de auto-avaliação e mudanças de seus pensamentos, emoções, crenças e opiniões e quaisquer profissões que envolvam com o conhecimento interior de você.';
        this.description = 'auto conhecimento, subjetividade, capacidade de auto entendimento, sentir e reconhecer os outros e o mundo em relação ao seu eu e reconhecer os processos necessários para sua mudança interior.';
        break;
      case 'linguistica':
        this.bestIndicatedArea = 'Letras/Comunicação/Idiomas'
        this.bestIndicatedProfessions = 'escritor(a), advogado(a), jornalista, orador(a), professor(a) de idiomas, poeta(ista), editor(a), linguista, tradutor(a) e apresentador(a)';
        this.description = 'Palavras, linguas, escrita, fala, retenção, interpretação audio e textual, explicação de ideias, diferenciação de falas e significados (contexto).';
        break;
      case 'matematica':
        this.bestIndicatedArea = 'Logica/Matematica/Naturais'
        this.bestIndicatedProfessions = 'cientista, engenheiro(a), especialista em computação, contador(a), banqueiro(a), estatistico(a), fisico(a), quimico(a), matematico(a), pesquisadores e analistas';
        this.description = 'pensamento lógico e racional, detecção de padrões, dedução científica racional, analíse de problemas, abstração e compreensão matemática, entendimento lógico de causa e efeito ou resultado.';
        break;
      case 'musical':
        this.bestIndicatedArea = 'Musica/Produção/Composição'
        this.bestIndicatedProfessions = 'musico(ista), cantor(a), compositor(a), dj, produtor(a) musical, afinador(a) de instrumentos, conselheiros de aúdio e professor(a) musical';
        this.description = 'habilidade musical, conhecimento musical, apreciação e utilização sonora, reconhecimento de padrões de tons, ritmos, notas e escalas e reconhecimento entre musica e sentimento.';
        break;
      case 'naturalista':
        this.bestIndicatedArea = 'Biologicas/Ecológia'
        this.bestIndicatedProfessions = 'biologo(a), cientista, veterinario(a), ecologista, oceanografo(a), conscientizador(a) e professor(a)';
        this.description = 'percepção ambiental, realizar classificações, distinções e manipolações do ecossistema, interação homem-meio ambiente e conscientização sustentável.';
        break;

    }

  }

}
