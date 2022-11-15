import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/Models/Course/Course';
import { PageEvent } from '@angular/material/paginator';
import { Observable, of } from 'rxjs';
import { courseFilter } from 'src/app/Models/Filters/Course/courseFilter';
import { CourseService } from 'src/app/Services/Course/course.service';
import { TestService } from 'src/app/Services/Test/test.service';
import { VacancyService } from 'src/app/Services/Vacancy/vacancy.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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

 

  categories: string[] = ['Construção', 'Tecnologia', 'Gestão'];


  courses: Observable<Course[]> = of([
    { id: 1, certificationId: 1, description: 'Curso introdutório ao Python', courseTitle: 'Introdução Python I', creationDate: new Date(), subscribeQuantity: 100, durationTime: '7 Horas', category: 'Tecnologia', hasTests: true, hasCertification: true, coursePlatform: 'Udemy', courseLink: 'https://www.udemy.com/pt/' },
    { id: 2, description: 'Curso Ruby I', courseTitle: 'Introdução Ruby I', creationDate:  new Date(), subscribeQuantity: 100, durationTime: '7 Horas', category: 'Tecnologia', hasTests: true, hasCertification: true, coursePlatform: 'Udemy', courseLink: 'https://www.udemy.com/pt/' },
    { id: 3, description: 'Curso Ruby II', courseTitle: 'Introdução Ruby II', creationDate:  new Date(), subscribeQuantity: 10, durationTime: '9 Horas', category: 'Tecnologia', hasTests: true, hasCertification: true, coursePlatform: 'Udemy', courseLink: 'https://www.udemy.com/pt/' },
  ]);

  constructor(private courseService: CourseService, private testService: TestService, private vacancyService: VacancyService, private router: Router) { }

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

  courseDuration(event: any) {

    this.filters.courseDuration = event.value;

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
    let filteredCoursesList = await this.courseService.getAllCoursesById(1, this.filters); //user logged

    if (filteredCoursesList.subscribe(result => result.length > 0))
      this.courses = filteredCoursesList;
  }

  async getCategories() {
    await this.vacancyService.getCategories().subscribe(category => {
      this.categories = category;
    }) //id do usuario logado

  }

  filterCourseList(filteredCourseList: Course[]) {


    if (this.filters.hasCertification)
      filteredCourseList = filteredCourseList.filter(course => course.hasCertification);

    if (this.filters.hasTest)
      filteredCourseList = filteredCourseList.filter(course => course.hasTests);

    if (this.filters.hasVacancyLink)
      filteredCourseList = filteredCourseList.filter(course => course.vacancyId != 0 || course.vacancyId != undefined);

    if (this.filters.questionsQuantity > 0)
      filteredCourseList = filteredCourseList.filter(course => course.hasTests && course.questionsQuantity ? course.questionsQuantity <= this.filters.questionsQuantity : 0);

    if (this.filters.subscribeQuantity > 0)
      filteredCourseList = filteredCourseList.filter(course => course.subscribeQuantity <= this.filters.subscribeQuantity);

    if (this.filters.courseDuration > 0)
      filteredCourseList = filteredCourseList.filter(course => parseInt(course.durationTime.split(' ')[0]) <= this.filters.courseDuration);

    if (this.filters.courseCategory)
      filteredCourseList = filteredCourseList.filter(course =>  course.category == this.filters.courseCategory);

    return filteredCourseList;
  }

  async applyFiltersCourses() {

    let filteredCourseList: Course[] = [];
    this.courses.subscribe(filterCourse => { filteredCourseList = filterCourse });

    this.filters.creationDate = !(<HTMLInputElement>document.getElementById('creationDate')) ? undefined : new Date((<HTMLInputElement>document.getElementById('creationDate')).value);
    this.filters.subscribeQuantity = !(<HTMLInputElement>document.getElementById('subscribeQuantity')) ? 0 : +(<HTMLInputElement>document.getElementById('subscribeQuantity')).value;
    this.filters.questionsQuantity = !(<HTMLInputElement>document.getElementById('questionsQuantity')) ? 0 : +(<HTMLInputElement>document.getElementById('questionsQuantity')).value;

    filteredCourseList = this.filterCourseList(filteredCourseList);

    this.courses = of(filteredCourseList);

    // let filteredCoursesList = await this.courseService.getAllCoursesById(1, this.filters);

    // if(filteredCoursesList.subscribe(result => result.length > 0 ? result: undefined))
    //   this.courses = filteredCoursesList;

  }

  async deleteCourse(courseId: number) {

    this.courseService.deleteCourse(courseId);

  }

  goToCourseRegister() {

    Swal.fire({
      title: 'Deseja criar um novo curso?',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim!',
      cancelButtonText: 'Não!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.router.navigate([`/empresa/curso`]);
      }
    })

  }

}
