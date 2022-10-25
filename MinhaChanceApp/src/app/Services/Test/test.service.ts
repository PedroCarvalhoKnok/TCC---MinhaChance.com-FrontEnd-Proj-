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

 

  sendTest(userAnswers: any[]) {
    return this.httpClient.post<any>(``, {})
      .pipe(
        retry(2),
      )
  }

  changeTest(userAnswers: any[]) {
    return this.httpClient.put<any>(``, {})
      .pipe(
        retry(2),
      )
  }

  getQuestions() {
    return this.httpClient.get<Question[]>(``)
      .pipe(
        retry(2),
      )
  }

  getUserTestResults(userId: number) {
    return this.httpClient.get<any[]>(``)
      .pipe(
        retry(2),
      )
  }

  getTestByUserId(userId: number) {
    return this.httpClient.get<any>(``)
      .pipe(
        retry(2),
      )
  }

  analyzeUserAnswers(userAnswers: any[]){

    let results: any = []

    let logicAnswers = userAnswers.filter(answer => answer.intelligenceType === 'Logica-Matematica');

    console.log(logicAnswers);

    let linguisticAnswers = userAnswers.filter(answer => answer.intelligenceType === 'Linguistica');

    let musicalAnswers = userAnswers.filter(answer => answer.intelligenceType === 'Musical');

    let kinesthesicAnswers = userAnswers.filter(answer => answer.intelligenceType === 'Cinetica');

    let spacialAnswers = userAnswers.filter(answer => answer.intelligenceType === 'Espacial-Visual');

    let interAnswers = userAnswers.filter(answer => answer.intelligenceType === 'Interpessoal');

    let intraAnswers = userAnswers.filter(answer => answer.intelligenceType === 'Intrapessoal');

    results.push({intelligenceType: 'Logica-Matematica', result: this.calculateAnswersType(logicAnswers)});

    results.push({intelligenceType: 'Linguistica', result: this.calculateAnswersType(linguisticAnswers)});

    results.push({intelligenceType: 'Musical', result: this.calculateAnswersType(musicalAnswers)});

    results.push({intelligenceType: 'Logica-Matematica', result: this.calculateAnswersType(kinesthesicAnswers)});

    results.push({intelligenceType: 'Logica-Matematica', result: this.calculateAnswersType(spacialAnswers)});

    results.push({intelligenceType: 'Logica-Matematica', result: this.calculateAnswersType(interAnswers)});

    results.push({intelligenceType: 'Logica-Matematica', result: this.calculateAnswersType(intraAnswers)}); 

    console.log(results);


    return results;

    

  }

  calculateAnswersType(typeAnswers: any[]){

    let totalAnswerType = typeAnswers.length;

    console.log(totalAnswerType)

    let percentualAnswerOne = (typeAnswers.filter(answer => answer.userAnswer === '1').length / totalAnswerType) * 100;

    console.log(percentualAnswerOne)

    let percentualAnswerTwo = (typeAnswers.filter(answer => answer.userAnswer === '2').length / totalAnswerType) * 100;

    let percentualAnswerTree = (typeAnswers.filter(answer => answer.userAnswer === '3').length / totalAnswerType) * 100;

    let percentualAnswerFour = (typeAnswers.filter(answer => answer.userAnswer === '4').length / totalAnswerType) * 100;

    let finalTypeResult = (percentualAnswerOne * -1) + (percentualAnswerTwo * -0.5) + (percentualAnswerTree * 0.5) + (percentualAnswerFour * 1);

    return finalTypeResult;

  }
  
}
