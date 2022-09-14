import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { Question } from 'src/app/Models/Test/Question';
import { TestService } from 'src/app/Services/Test/test.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-skills-test',
  templateUrl: './skills-test.component.html',
  styleUrls: ['./skills-test.component.scss']
})
export class SkillsTestComponent implements OnInit {

  numberOfColumns: number = 5;

  data: any[] = [
    { firstRow: 1, secondRow: 2, thirdRow: 3, forthRow: 4, fifthRow: 5 },
    { firstRow: 6, secondRow: 7, thirdRow: 8, forthRow: 9, fifthRow: 10 },
    { firstRow: 11, secondRow: 12, thirdRow: 13, forthRow: 14, fifthRow: 15 },
    { firstRow: 16, secondRow: 17, thirdRow: 18, forthRow: 19, fifthRow: 20 },
    { firstRow: 21, secondRow: 22, thirdRow: 23, forthRow: 24, fifthRow: 25 },
    { firstRow: 26, secondRow: 27, thirdRow: 28, forthRow: 29, fifthRow: 30 },
    { firstRow: 31, secondRow: 32, thirdRow: 33, forthRow: 34, fifthRow: 35 },
    { firstRow: 36, secondRow: 37, thirdRow: 38, forthRow: 39, fifthRow: 40 },
    { firstRow: 41, secondRow: 42, thirdRow: 43, forthRow: 44, fifthRow: 45 },
  ];

  heigthProp: string = '1:0.6';

  userId: number;

  testQuestions: Observable<Question[]> = of([
    {
      id: 1,
      questionDescription: 'pergunta 1',
      answerA: 'A',
      answerB: 'B',
      answerC: 'C',
      answerD: 'D',
      answerE: 'E',
      answerF: 'F',
      answerG: 'G',
      answerH: 'H',
      userAnswer: 'D',
    },
    {
      id: 2,
      questionDescription: 'pergunta 2',
      answerA: 'A',
      answerB: 'B',
      answerC: 'C',
      answerD: 'D',
      answerE: 'E',
      answerF: 'F',
      answerG: 'G',
      answerH: 'H',
      userAnswer: 'C',
    },
    {
      id: 3,
      questionDescription: 'pergunta 3',
      answerA: 'A',
      answerB: 'B',
      answerC: 'C',
      answerD: 'D',
      answerE: 'E',
      answerF: 'F',
      answerG: 'G',
      answerH: 'H',
      userAnswer: 'G',
    },
    {
      id: 4,
      questionDescription: 'pergunta 4',
      answerA: 'A',
      answerB: 'B',
      answerC: 'C',
      answerD: 'D',
      answerE: 'E',
      answerF: 'F',
      answerG: 'G',
      answerH: 'H',
      userAnswer: 'H',
    }
  ])

  constructor(private router: Router, private activeRouter: ActivatedRoute, private testService: TestService) { }

  async ngOnInit() {

    this.userId = this.activeRouter.snapshot.params?.['userId'];

    this.testQuestions = await this.testService.getQuestions();

    this.testQuestions.subscribe(questions => {

      let idList: number[] = []

      questions.forEach(question => {
        idList.push(question.id)
      });

      let questionsFormatted = this.splitQuestionsIntoChunks(idList);

      this.data = this.fitFormattedQuestionsIntoGrid(questionsFormatted);

    })

  }

  splitQuestionsIntoChunks(questions: number[]): any {
    const perChunk = this.numberOfColumns // items per chunk    

    const inputArray = questions;

    const result = inputArray.reduce((resultArray: any, item, index) => {
      const chunkIndex = Math.floor(index / perChunk)

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [] // start a new chunk
      }

      resultArray[chunkIndex].push(item)

      return resultArray
    }, [])

    return result;
  }

  fitFormattedQuestionsIntoGrid(questionsFormatted: any) {

    let dataResult: any = []
    let obj: any;

    for (let i = 0; i < questionsFormatted.length; i++) {

      switch (questionsFormatted[i].length) {
        case 1:
          obj = { firstRow: 0 };
          obj.firstRow = questionsFormatted[i][0];
          break;
        case 2:
          obj = { firstRow: 0, secondRow: 0 };
          obj.firstRow = questionsFormatted[i][0]
          obj.secondRow = questionsFormatted[i][1]
          break;
        case 3:
          obj = { firstRow: 0, secondRow: 0, thirdRow: 0 };
          obj.firstRow = questionsFormatted[i][0]
          obj.secondRow = questionsFormatted[i][1]
          obj.thirdRow = questionsFormatted[i][2]
          break;
        case 4:
          obj = { firstRow: 0, secondRow: 0, thirdRow: 0, forthRow: 0 };
          obj.firstRow = questionsFormatted[i][0]
          obj.secondRow = questionsFormatted[i][1]
          obj.thirdRow = questionsFormatted[i][2]
          obj.forthRow = questionsFormatted[i][3]
          break;
        case 5:
          obj = { firstRow: 0, secondRow: 0, thirdRow: 0, forthRow: 0, fifthRow: 0 }
          obj.firstRow = questionsFormatted[i][0]
          obj.secondRow = questionsFormatted[i][1]
          obj.thirdRow = questionsFormatted[i][2]
          obj.forthRow = questionsFormatted[i][3]
          obj.fifthRow = questionsFormatted[i][4]
          break;
      }

      dataResult.push(obj);

    }

    return dataResult;

  }

  handleSize(event) {
    if (event.target.innerWidth < 1000)
      this.heigthProp = '1:0.6'
    if (event.target.innerWidth >= 800 && event.target.innerWidth <= 1000)
      this.heigthProp = '1:0.8'

    if (event.target.innerWidth >= 600 && event.target.innerWidth <= 800)
      this.heigthProp = '1:1';

    if (event.target.innerWidth >= 400 && event.target.innerWidth <= 600)
      this.heigthProp = '1:1.3';

    if (event.target.innerWidth >= 200 && event.target.innerWidth <= 400)
      this.heigthProp = '1:1.7';

  }

  scrollToElement(id) {

    console.log(id);
    (<HTMLInputElement>document.getElementById(`question${id}`)).scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });

  }

  setSelectedQuestion(questionIndex: number, questionId: number, userAnswer: string) {
    console.log(questionIndex);
    (<HTMLInputElement>document.getElementById(`item${questionId}`)).className = 'btn btn-primary label-numbers';


    this.testQuestions.subscribe(questions => {
      questions[questionIndex].userAnswer = userAnswer;
    })


  }

  confirmSendSkillTest() {
    Swal.fire({
      title: 'Tem certeza que deseja enviar o teste de aptidões?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim!',
      cancelButtonText: 'Não!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.sendSkillTest();
      }
    })
  }

  validateMissingAnswers(questions: Question[]) {

    let questionMissing = questions.find(question => question.userAnswer === '')
    if (questionMissing) {
      Swal.fire(
        'Algo deu errado!',
        'Verifique se todas as perguntas foram respondidas',
        'warning'
      )

    }
  }

  async sendSkillTest() {

    let answerList: any[] = []

    let checkTest: any;

    this.testQuestions.subscribe(questions => {

      this.validateMissingAnswers(questions);

      questions.forEach(question => {
        answerList.push({ id: question.id, userAnswer: question.userAnswer })
      });

    });

    await this.testService.getTestByUserId(this.userId).subscribe(test => checkTest = test);

    if (!checkTest) {

      await this.testService.sendTest(answerList).subscribe(result => {
        if (result) {
          Swal.fire({
            title: 'Suas respostas foram registradas com sucesso!',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          }).then(async (result) => {
            if (result.isConfirmed) {
              this.router.navigate([`/candidato/${this.userId}/teste/resultado`])
            }
          })
        }
        else {
          Swal.fire(
            'Ops algo deu errado no envio!',
            'Tente novamente',
            'warning'
          )
        }
      });
    }
    else {

      await this.testService.changeTest(answerList).subscribe(result => {
        if (result) {
          Swal.fire({
            title: 'Suas respostas foram atualizadas com sucesso!',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          }).then(async (result) => {
            if (result.isConfirmed) {
              this.router.navigate([`/candidato/${this.userId}/teste/resultado`])
            }
          })
        }
        else {
          Swal.fire(
            'Ops algo deu errado no envio!',
            'Tente novamente',
            'warning'
          )
        }
      });
    }
  }

}
