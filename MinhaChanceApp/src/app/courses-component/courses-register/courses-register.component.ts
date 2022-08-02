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

  addSession(session: Session): void{

    this.sessions.push(session);

  }

  addQuestion(question: Question): void{

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
    this.formCourse = new FormGroup({
      courseTitle: new FormControl(this.course.courseTitle, [
        Validators.required,
        Validators.minLength(4),
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
        Validators.minLength(4),
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
