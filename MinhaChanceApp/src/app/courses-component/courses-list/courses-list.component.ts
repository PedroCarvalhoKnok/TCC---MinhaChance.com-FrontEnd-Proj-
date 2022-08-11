import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/Models/Course/Course';
import { Test } from 'src/app/Models/Course/Test';
import { PageEvent } from '@angular/material/paginator';
import { Observable, of } from 'rxjs';
import { courseFilter } from 'src/app/Models/Filters/Course/courseFilter';
import { CourseService } from 'src/app/Services/Course/course.service';
import { CertificationService } from 'src/app/Services/Certification/certification.service';
import { TestService } from 'src/app/Services/Test/test.service';
import { QuestionService } from 'src/app/Services/Question/question.service';
import { SessionService } from 'src/app/Services/Session/session.service';
import { AzureBlobStorageService } from 'src/app/Services/Azure/azure-blob-storage.service';
import { Session } from 'src/app/Models/Course/Session';
import { Certification } from 'src/app/Models/Course/Certification';
import { VacancyService } from 'src/app/Services/Vacancy/vacancy.service';
import { Question } from 'src/app/Models/Course/Question';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  pageEvent!: PageEvent;
  showCertificationTitle: boolean = false;
  showTestTitle: boolean = false;
  filters: courseFilter = new courseFilter();

  
  test: Test = { id: 1, certificationId: 1, durationTime: '1 Hora', difficulty: 'Iniciante', questionsQuantity: 9, approvalPercentual: '50%'}
  test2: Test = { id: 2, certificationId: 0, durationTime: '1 Hora', difficulty: 'Iniciante', questionsQuantity: 9, approvalPercentual: '50%'}

  categories: string[] = ['Construção', 'Tecnologia', 'Gestão'];


  courses: Observable<Course[]> = of([
    { id: 1, sessionsQuantity: 4, certificationId: 1, test: this.test, description: 'Curso introdutório ao Python', courseTitle: 'Introdução Python I', creationDate: '19/07/2022', subscribeQuantity: 100, durationTime: '7 Horas', category: 'Tecnologia'},
    { id: 2, sessionsQuantity: 3, certificationId: undefined, test: this.test2, description: 'Curso Ruby I', courseTitle: 'Introdução Ruby I', creationDate: '19/07/2022', subscribeQuantity: 100, durationTime: '7 Horas', category: 'Tecnologia' },
    { id: 3, sessionsQuantity: 2, certificationId: 2, test: undefined, description: 'Curso Ruby II', courseTitle: 'Introdução Ruby II', creationDate: '19/07/2022', subscribeQuantity: 10, durationTime: '9 Horas', category: 'Tecnologia' },
  ]);

  constructor(private courseService: CourseService, private blobService: AzureBlobStorageService, private certificationService: CertificationService, private testService: TestService, private questionService: QuestionService, private sessionService: SessionService, private vacancyService: VacancyService) { }

  async ngOnInit(): Promise<void> {
    // await this.getCategories();
    // await this.getAllCoursesByUserId(); getting all courses
  }

  changeShowCertification() {
    this.showCertificationTitle = true;
    this.filters.hasCertification = true;
  }

  changeHideCertification() {
    this.showCertificationTitle = false;
    this.filters.hasCertification = false;
  }
  changeShowTest() {
    this.showTestTitle = true;
    this.filters.hasTest = true;
  }

  changeHideTest() {
    this.showTestTitle = false;
    this.filters.hasTest = false;
  }

  changeCategoryFilter(category: string) {
    this.filters.courseCategory = category;
  }

  changeLinkedVacancies(hasLink: boolean) {
    this.filters.hasVacancyLink = hasLink ? true : false;
  }

  // difficultyRateChange(rate: number) {

  //   this.filters.difficulty = this.switchDifficultyRate(rate);

  // }

  difficultyTestRateChange(rate: number) {

    this.filters.testDifficulty = this.switchDifficultyRate(rate);

  }

  testDuration(event: any) {

    this.filters.testDuration = event.value;

  }

  switchDifficultyRate(rate: number): string {

    switch (rate) {
      case 1:
        return 'Iniciante'
        break;
      case 2:
        return 'Basico'
      case 3:
        return 'Intermediario'
      case 4:
        return 'Avançado'
      case 5:
        return 'Profissional'
      default:
        return ''
    }

  }

  async getAllCoursesByUserId() {
    let filteredCoursesList = await this.courseService.getAllCoursesById(1, this.filters);

    if (filteredCoursesList.subscribe(result => result.length > 0))
      this.courses = filteredCoursesList;
  }

  async getCategories() {
    await this.vacancyService.getCategoriesByUser(1).subscribe(category => {
      this.categories = category;
    }) //id do usuario logado

  }

   filterCourseList(filteredCourseList: Course[]){

    if (this.filters.testDifficulty != '' || undefined)
      filteredCourseList = filteredCourseList.filter(course => course.test?.difficulty == this.filters.testDifficulty);

    if (this.filters.hasCertification)
      filteredCourseList = filteredCourseList.filter(course => course.certificationId != 0 || course.certificationId != undefined);

    if (this.filters.hasTest)
      filteredCourseList = filteredCourseList.filter(course => course.testId != 0 || course.certificationId != undefined);

    if (this.filters.hasVacancyLink)
      filteredCourseList = filteredCourseList.filter(course => course.vacancyId != 0 || course.vacancyId != undefined);

    if (this.filters.questionsQuantity != 0)
      filteredCourseList = filteredCourseList.filter(course => course.test != undefined ? course.test.questionsQuantity <= this.filters.questionsQuantity: 0);

    if (this.filters.approvalPercentual > 0)
      filteredCourseList = filteredCourseList.filter(course => course.test != undefined ? parseInt(course.test?.approvalPercentual.replace('%', '')) <= this.filters.approvalPercentual: 0);

    if (this.filters.subscribeQuantity > 0)
      filteredCourseList = filteredCourseList.filter(course => course.subscribeQuantity <= this.filters.subscribeQuantity);

    if (this.filters.testDuration > 0)
      filteredCourseList = filteredCourseList.filter(course => course.test != undefined? parseInt(course.test.durationTime.split(' ')[0]) <= this.filters.testDuration: 0);

    if (this.filters.courseCategory != '' || undefined)
      filteredCourseList = filteredCourseList.filter(course => course.vacancy != undefined ? course.vacancy.category == this.filters.courseCategory: '');

      return filteredCourseList;
  }

  async applyFiltersCourses() {

    let filteredCourseList: Course[] = [];
    this.courses.subscribe(filterCourse => { filteredCourseList = filterCourse });

    this.filters.approvalPercentual = (<HTMLInputElement>document.getElementById('approvalPercentual')) == null || undefined ? 0 : +(<HTMLInputElement>document.getElementById('approvalPercentual')).value;
    this.filters.subscribeQuantity = (<HTMLInputElement>document.getElementById('subscribeQuantity')) == null || undefined ? 0 : +(<HTMLInputElement>document.getElementById('subscribeQuantity')).value;

    filteredCourseList = this.filterCourseList(filteredCourseList);

    this.courses = of(filteredCourseList);

    // let filteredCoursesList = await this.courseService.getAllCoursesById(1, this.filters);

    // if(filteredCoursesList.subscribe(result => result.length > 0 ? result: undefined))
    //   this.courses = filteredCoursesList;

  }

  async deleteCourse(courseId: number) {

    await this.sessionService.getSessionsByCourseId(courseId).subscribe(sessions => sessions.forEach(session => {
      this.blobService.deleteFile('', `${session.videoSessionName}/${session.id}`, 'CoursesVideos', () => { })
      this.blobService.deleteFile('', session.pdfSessionName, 'CoursesPDFs', () => { })
    }));


    await this.certificationService.getCertificationByCourseId(courseId).subscribe(certification => {
      this.blobService.deleteFile('', `${certification.corporativeSignatureName}/${courseId}`, 'CorporativeSignatures', () => { })
    });

    this.courseService.deleteCourse(courseId);

  }

}
