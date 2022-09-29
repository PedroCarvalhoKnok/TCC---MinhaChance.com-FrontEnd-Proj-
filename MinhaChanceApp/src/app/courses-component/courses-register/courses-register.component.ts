import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Course } from 'src/app/Models/Course/Course';
import { CourseService } from 'src/app/Services/Course/course.service';
import { TestService } from 'src/app/Services/Test/test.service';
import { ActivatedRoute } from '@angular/router';
import { Vacancy } from 'src/app/Models/Vacancy/Vacancy';
import { VacancyService } from 'src/app/Services/Vacancy/vacancy.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses-register',
  templateUrl: './courses-register.component.html',
  styleUrls: ['./courses-register.component.scss']
})
export class CoursesRegisterComponent implements OnInit {

  formCourse!: FormGroup;
  formSession!: FormGroup;
  formCertification!: FormGroup;
  formTest!: FormGroup;
  formQuestion!: FormGroup;
  course = new Course();

  hasCertification: boolean = false;
  hasTest: boolean = false;

  courseId!: number;

  filesTobeDeleted!: any[];
  objectsTobeDeleted!: any[];

  vacanciesList!: Vacancy[];
  categoriesList!: string[];

  constructor(private router: ActivatedRoute, private vacancyService: VacancyService, private formBuilder: FormBuilder, private courseService: CourseService, private testService: TestService) {

  }

  async ngOnInit(): Promise<void> {
    let courseId = this.router.snapshot.params?.['courseId'];
    //console.log(courseId); usar para carregar edição de curso
    this.courseId = courseId;

    this.createFormCourseValidation();

    //this.getActiveVacancies();

    if (courseId != undefined) {

      let courseSelected = await this.courseService.getCourseById(courseId);
      courseSelected.subscribe(async course => {
        this.course.courseTitle = course.courseTitle;
        this.course.vacancyId = course.vacancyId;
        this.course.durationTime = course.durationTime;
        this.hasCertification = course.hasCertification ? true : false;
        this.hasTest = course.hasTests ? true : false;
        this.course.description = course.description;
        this.course.id = courseId;

      });

    }


  }

  // formatCreationDate(data: Date) {

  //   let dataFormatada = `${data.getDay()}/${data.getMonth() + 1}/${data.getFullYear()} ${data.getHours}:${data.getMinutes}:${data.getSeconds}`;

  //   return new Date(dataFormatada);

  // }

  async registerCourse() {
    try {

      if (this.formCourse.valid) {

        this.course.creationDate = new Date();

        await this.courseService.postCourse(this.course).subscribe(course => {

          course ? Swal.fire(
            'Sucesso',
            `Curso cadastrado com sucesso!`,
            'success'
          ) :
            Swal.fire(
              'Ops, ocorreu um erro!',
              `Ocorreu um erro ao efetivar o cadastro do curso, tente novamente!`,
              'warning'
            )



        }); //inserir curso no banco retornando id dele mock exemplo await 

      }


    }
    catch (e) {

    }
  }

  async editCourse(course: Course) {
    try {

      if (this.formCourse.valid) {
        course = this.course
        await this.courseService.editCourse(course);

      }

    }
    catch (e) {

    }
  }

  async getActiveVacancies() {

    await this.vacancyService.getActiveVacanciesByUser(1).subscribe(vacancies => {
      this.vacanciesList = vacancies;
    }); //passar id do usuario logado

  }

  courseImageSelected(event: any) {
    this.course.courseimage = event.target.files[0];
  }




  changeShowCertification() {
    this.hasCertification = !this.hasCertification;

  }

  changeShowTest() {

    this.hasTest = !this.hasTest;

  }

  createFormCourseValidation(): void {
    this.formCourse = new FormGroup({
      courseTitle: new FormControl(this.course.courseTitle, [
        Validators.required,
      ]),
      courseLink: new FormControl(this.course.courseLink, [
        Validators.required,
      ]),
      coursePlatform: new FormControl(this.course.coursePlatform, [
        Validators.required,
      ]),
      courseDuration: new FormControl(this.course.durationTime, [
        Validators.required,
        this.forbiddenDurationTimeValidator(/0/i)
      ]),
      courseDescription: new FormControl(this.course.description, [
        Validators.required,
      ]),
      courseImage: new FormControl(this.course.courseimage, [
        Validators.required,
        this.forbiddenSendFileValidator()
      ])
    });

  }

  forbiddenDurationTimeValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? { forbiddenDurationTime: { value: control.value } } : null;
    };
  }

  forbiddenSendFileValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {

      let error: string = '';

      if (!this.course.courseimage) {
        error = control.value;
        return { forbiddenSendFile: error }
      }


      return null;
    };
  }

}
