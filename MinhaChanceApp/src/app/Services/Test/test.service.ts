import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleErrors } from '../Errors/handleError';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Question } from 'src/app/Models/Test/Question';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer token`
    })
  }

  sendTest(userAnswers: any[]) {
    return this.httpClient.post<boolean>(``, this.httpOptions)
      .pipe(
        retry(2),
      )
  }

  changeTest(userAnswers: any[]) {
    return this.httpClient.put<boolean>(``, this.httpOptions)
      .pipe(
        retry(2),
      )
  }

  getQuestions() {
    return this.httpClient.get<Question[]>(``, this.httpOptions)
      .pipe(
        retry(2),
      )
  }

  getUserTestResults(userId: number) {
    return this.httpClient.get<any[]>(``, this.httpOptions)
      .pipe(
        retry(2),
      )
  }

  getTestByUserId(userId: number) {
    return this.httpClient.get<any>(``, this.httpOptions)
      .pipe(
        retry(2),
      )
  }

  analyzeUserAnswers(userAnswers: any[]){

    let logicAnswers = userAnswers.filter(answer => answer.intelligenceType === 'Logica-Matematica');

    let linguisticAnswers = userAnswers.filter(answer => answer.intelligenceType === 'Linguistica');

    let musicalAnswers = userAnswers.filter(answer => answer.intelligenceType === 'Musical');

    let kinesthesicAnswers = userAnswers.filter(answer => answer.intelligenceType === 'Cinética');

    let spacialAnswers = userAnswers.filter(answer => answer.intelligenceType === 'Espacial-Visual');

    let interAnswers = userAnswers.filter(answer => answer.intelligenceType === 'Interpersonal');

    let intraAnswers = userAnswers.filter(answer => answer.intelligenceType === 'Intrapersonal');

    this.calculateAnswersType(logicAnswers);

    

  }

  calculateAnswersType(typeAnswers: any[]){

    let totalAnswerType = typeAnswers.length;

    let percentualAnswerOne = (typeAnswers.filter(answer => answer.userAnswer === '1').length / totalAnswerType) * 100;

    let percentualAnswerTwo = (typeAnswers.filter(answer => answer.userAnswer === '2').length / totalAnswerType) * 100;

    let percentualAnswerTree = (typeAnswers.filter(answer => answer.userAnswer === '3').length / totalAnswerType) * 100;

    let percentualAnswerFour = (typeAnswers.filter(answer => answer.userAnswer === '4').length / totalAnswerType) * 100;

    let finalTypeResult = (percentualAnswerOne * -1) + (percentualAnswerTwo * -0.5) + (percentualAnswerTree * 0.5) + (percentualAnswerFour * 1);

    return finalTypeResult;

  }
  
}
