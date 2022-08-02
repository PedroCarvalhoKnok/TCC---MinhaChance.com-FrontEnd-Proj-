import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Certification } from 'src/app/Models/Certification/Certification';
import { Course } from 'src/app/Models/Course/Course';
import { Question } from 'src/app/Models/Question/Question';
import { Session } from 'src/app/Models/Session/Session';
import { Test } from 'src/app/Models/Test/Test';

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
  session = new Session();
  sessions: Session[] = [];
  certification = new Certification();
  test = new Test();
  question = new Question();
  questions: Question[] = [];

  hasCertification: boolean = false;
  hasTest: boolean = false;

  constructor(private formBuilder: FormBuilder) 
  {
      
  }

  ngOnInit(): void 
  {
    this.createFormCourseValidation();
    this.createFormSessionValidation();
    this.createFormCertificationValidation;
    this.createFormTestValidation();
    this.createFormQuestionValidation();
  }

  async registerCourse(){
    let test: Test;
    let certification: Certification;

    let retornoIdCertification: string = '';
    let retornoIdTest: string = '';

    if(this.formCertification.valid)
    {
      certification = this.certification;
      retornoIdCertification = '1'; //inserir curso no banco retornando id dele mock exemplo await 
    }
    if(this.formTest.valid)
    {
      test = this.test;
      if(retornoIdCertification != '' || retornoIdCertification != undefined)
        test.certificationId = retornoIdCertification

      test.questions = this.questions;
      retornoIdTest = '1'; //inserir curso no banco retornando id dele mock exemplo await 

    }
    if(this.formCourse.valid)
    {
      let course: Course = this.course
      course.sessions = this.sessions;
     // course.userId = idUsuarioLogado
     
     if(retornoIdCertification != '' || retornoIdCertification != undefined)
      course.certificationId = retornoIdCertification;

     if(retornoIdTest != '' || retornoIdTest != undefined)
      course.testId = retornoIdTest;

      let retornoIdCurso = 1; //inserir curso no banco retornando id dele mock exemplo await 


    }
  }

  addSession(session: Session): void{

    if(this.formSession.valid)
      this.sessions.push(session);

  }

  addQuestion(question: Question): void{

    if(this.formQuestion.valid)
      this.questions.push(question);

  }

  changeShowCertification()
  {
    this.hasCertification = !this.hasCertification;
   
  }

  changeShowTest()
  {
    
    this.hasTest = !this.hasTest;
    
  }

  createFormCourseValidation(): void
  {
    this.formCourse = this.formBuilder.group({
      courseTitle: new FormControl(this.course.courseTitle, [
        Validators.required,
      ]),
      courseDuration: new FormControl(this.course.durationTime, [
        Validators.required,
        Validators.maxLength(3),
      ]),
      courseDescription: new FormControl(this.course.description, [
        Validators.required,
      ]),
    });

  }

  createFormSessionValidation(): void
  {
    this.formSession = new FormGroup({
      sessionTitle: new FormControl(this.session.sessionTitle, [
        Validators.required,
        Validators.minLength(1),
      ]),
      sessionDescription: new FormControl(this.session.description, [
        Validators.required,
      ]),
    });

  }

  createFormCertificationValidation(): void
  {
    this.formCertification = new FormGroup({
      certificationTitle: new FormControl(this.certification.certificationTitle, [
        Validators.required,
        Validators.minLength(4),
      ]),
      certificationDescription: new FormControl(this.certification.description, [
        Validators.required,
      ]),
    });

  }

  createFormTestValidation(): void
  {
    this.formTest = new FormGroup({
      testDuration: new FormControl(this.test.durationTime, [
        Validators.required,
        Validators.maxLength(3),
      ]),
      testDifficulty: new FormControl(this.test.difficulty, [
        Validators.required,
      ]),
    });

  }

  createFormQuestionValidation(): void
  {
    this.formQuestion = new FormGroup({
      testQuestion: new FormControl(this.question.question, [
        Validators.required,
      ]),
      answerA: new FormControl(this.question.answerA, [
        Validators.required,
      ]),
      answerB: new FormControl(this.question.answerB, [
        Validators.required,
      ]),
      answerC: new FormControl(this.question.answerC, [
        Validators.required,
      ]),
      answerD: new FormControl(this.question.answerD, [
        Validators.required,
      ]),
      answerE: new FormControl(this.question.answerE, [
        Validators.required,
      ]),
    });

  }

  
}
