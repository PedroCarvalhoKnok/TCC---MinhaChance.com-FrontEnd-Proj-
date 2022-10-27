import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleErrors } from '../Errors/handleError';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Question } from 'src/app/Models/Test/Question';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  urlTestIm = `${environment.urlBaseApi}/testeIM`;

  constructor(private httpClient: HttpClient) { }


  formatMonth(mes: number): string {

    let mesFormatted = mes < 10 ? `0${mes}` : mes.toString();

    return mesFormatted;

  }

  formatCreationDate() {

    let actualDate: Date = new Date();

    var data =
      actualDate.getFullYear() +
      "/" +
      this.formatMonth(actualDate.getMonth() + 1) +
      "/" +
      actualDate.getDate();

    return data;
  }

 

  sendTest(userAnswers: any[], testImId: number) {
    console.log(userAnswers);
    return this.httpClient.put<any>(`${this.urlTestIm}/${testImId}`, {
      "linguistica": userAnswers.find(item => item.intelligenceType === 'Linguistica').result, 
      "matematica": userAnswers.find(item => item.intelligenceType === 'Logica-Matematica').result, 
      "espacial": userAnswers.find(item => item.intelligenceType === 'Espacial-Visual').result, 
      "cinestesica": userAnswers.find(item => item.intelligenceType === 'Cinetica').result, 
      "musical": userAnswers.find(item => item.intelligenceType === 'Musical').result,
      "interpessoal": userAnswers.find(item => item.intelligenceType === 'Interpessoal').result, 
      "intrapessoal": userAnswers.find(item => item.intelligenceType === 'Intrapessoal').result, 
      "naturalista": 0, 
      "data": this.formatCreationDate(),
      "cadastrado": 1
  })
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

  getUserTestResults(testImId: number) {
    return this.httpClient.get<any[]>(`${this.urlTestIm}/${testImId}`)
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

    let logicAnswers = userAnswers.filter(answer => answer.intelligenceType === 'Logica-Matematica' && answer.userAnswer);

    let linguisticAnswers = userAnswers.filter(answer => answer.intelligenceType === 'Linguistica' && answer.userAnswer);

    let musicalAnswers = userAnswers.filter(answer => answer.intelligenceType === 'Musical' && answer.userAnswer);

    let kinesthesicAnswers = userAnswers.filter(answer => answer.intelligenceType === 'Cinestesica' && answer.userAnswer);

    let spacialAnswers = userAnswers.filter(answer => answer.intelligenceType === 'Espacial-Visual' && answer.userAnswer);

    let interAnswers = userAnswers.filter(answer => answer.intelligenceType === 'Interpessoal' && answer.userAnswer);

    let intraAnswers = userAnswers.filter(answer => answer.intelligenceType === 'Intrapessoal' && answer.userAnswer);

    let naturalistAnswers = userAnswers.filter(answer => answer.intelligenceType === 'Naturalista' && answer.userAnswer);

    results.push({intelligenceType: 'Logica-Matematica', result: logicAnswers.length > 0 ? this.calculateAnswersType(logicAnswers) : 0});

    results.push({intelligenceType: 'Linguistica', result: linguisticAnswers.length > 0 ? this.calculateAnswersType(linguisticAnswers) : 0});

    results.push({intelligenceType: 'Musical', result: musicalAnswers.length > 0 ? this.calculateAnswersType(musicalAnswers) : 0});

    results.push({intelligenceType: 'Cinetica', result: kinesthesicAnswers.length > 0 ? this.calculateAnswersType(kinesthesicAnswers) : 0});

    results.push({intelligenceType: 'Espacial-Visual', result: spacialAnswers.length > 0 ? this.calculateAnswersType(spacialAnswers) : 0});

    results.push({intelligenceType: 'Interpessoal', result: interAnswers.length > 0 ? this.calculateAnswersType(interAnswers) : 0});

    results.push({intelligenceType: 'Intrapessoal', result: intraAnswers.length > 0 ? this.calculateAnswersType(intraAnswers) : 0});
    
    results.push({intelligenceType: 'Naturalista', result: naturalistAnswers.length > 0 ? this.calculateAnswersType(naturalistAnswers) : 0});

    console.log(results);

    return results;

  }

  calculateAnswersType(typeAnswers: any[]){

    let totalAnswerType = typeAnswers.length;

    console.log(typeAnswers)

    let productAnswerOne = (typeAnswers.filter(answer => answer.userAnswer === '1').length * 0);

    console.log(productAnswerOne)

    let productAnswerTwo = (typeAnswers.filter(answer => answer.userAnswer === '2').length * 1);

    let productAnswerTree = (typeAnswers.filter(answer => answer.userAnswer === '3').length * 2);

    let productAnswerFour = (typeAnswers.filter(answer => answer.userAnswer === '4').length * 3);

    let productAnswerFive = (typeAnswers.filter(answer => answer.userAnswer === '5').length * 4);

    let finalTypeResult =  (productAnswerOne + productAnswerTwo + productAnswerTree + productAnswerFour + productAnswerFive) / totalAnswerType;

    let finalTypePercentage = (finalTypeResult / 4) * 100;

    console.log(finalTypePercentage)

    return finalTypePercentage;

  }
  
}
