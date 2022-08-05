import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Certification } from 'src/app/Models/Certification/Certification';
import { Course } from 'src/app/Models/Course/Course';
import { Question } from 'src/app/Models/Question/Question';
import { Session } from 'src/app/Models/Session/Session';
import { Test } from 'src/app/Models/Test/Test';
import { AzureBlobStorageService } from 'src/app/Services/Azure/azure-blob-storage.service';
import { CertificationService } from 'src/app/Services/Certification/certification.service';
import { CourseService } from 'src/app/Services/Course/course.service';
import { QuestionService } from 'src/app/Services/Question/question.service';
import { SessionService } from 'src/app/Services/Session/session.service';
import { TestService } from 'src/app/Services/Test/test.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private router: ActivatedRoute, private formBuilder: FormBuilder, private blobService: AzureBlobStorageService, private certificationService: CertificationService, private courseService: CourseService, private testService: TestService, private sessionService: SessionService, private questionService: QuestionService) {

  }

  async ngOnInit(): Promise<void> {
    let courseId = this.router.snapshot.params?.['courseId'];
    //console.log(courseId); usar para carregar edição de curso


    this.createFormCourseValidation();
    this.createFormSessionValidation();
    this.createFormCertificationValidation();
    this.createFormTestValidation();
    this.createFormQuestionValidation();

    if (courseId != undefined) {

      let courseSelected = await this.courseService.getCourseById(courseId);
      courseSelected.subscribe(course => {
        this.course.courseTitle = course.courseTitle;
        this.course.vacancyId = course.vacancyId;
        this.course.durationTime = course.durationTime;
        this.hasCertification = course.certificationId != null || undefined ? true : false;
        this.hasTest = course.testId != null || undefined ? true : false;
        this.course.description = course.description;
        this.course.id = course.id;
      });

      let sessionsSelected = await this.sessionService.getSessionsByCourseId(courseId);
      sessionsSelected.subscribe(sessions => {
        this.sessions = sessions;
      });

      let certificationSelected = await this.certificationService.getCertificationByCourseId(courseId);
      certificationSelected.subscribe(certification => {
        this.certification.certificationTitle = certification.certificationTitle;
        this.certification.description = certification.description;
        this.certification.id = certification.id;
      });

      let testSelected = await this.testService.getTestByCourseId(courseId);
      testSelected.subscribe(test => {
        this.test.approvalPercentual = test.approvalPercentual;
        this.test.certificationId = test.certificationId;
        this.test.durationTime = test.durationTime;
        this.test.questionsQuantity = test.questionsQuantity;
        this.test.id = test.id;
      });

      let questionsSelected = await this.questionService.getQuestionsByTestId(this.test.id);
      questionsSelected.subscribe(questions => {
        this.questions = questions;
      });

    }


  }

  async registerCourse() {
    try {
      let test: Test;
      let certification: Certification;

      let retornoIdCertification: number = 0;
      let retornoIdTest: number = 0;
      let retornoIdCurso: number = 0;

      if (this.formCertification.valid) {
        certification = this.certification;
        await this.certificationService.postCertification(certification).subscribe(certificationId => { retornoIdCertification = certificationId }); //inserir curso no banco retornando id dele mock exemplo await 
      }
      if (this.formTest.valid) {
        test = this.test;
        if (retornoIdCertification != 0 || retornoIdCertification != undefined)
          test.certificationId = retornoIdCertification

        await this.testService.postTest(test).subscribe(testId => { retornoIdTest = testId }); //inserir curso no banco retornando id dele mock exemplo await 

      }
      if (this.questions.length > 0) {
        for (let question of this.questions) {
          if (retornoIdTest != 0 || retornoIdTest != undefined)
            question.testId = retornoIdTest

          await this.questionService.postQuestion(question);//inserir questao no banco retornando id dele mock exemplo await 
        }
      }
      if (this.formCourse.valid) {
        let course: Course = this.course
        // course.userId = idUsuarioLogado

        if (retornoIdCertification != 0 || retornoIdCertification != undefined)
          course.certificationId = retornoIdCertification;

        if (retornoIdTest != 0 || retornoIdTest != undefined)
          course.testId = retornoIdTest;

        await this.courseService.postCourse(course).subscribe(courseId => { retornoIdCurso = courseId}); //inserir curso no banco retornando id dele mock exemplo await 

      }
      if (this.sessions.length > 0) {
        for (let session of this.sessions) {
          if (retornoIdCurso != 0 || retornoIdCurso != undefined)
            session.courseId = retornoIdCurso

          await this.sessionService.postSession(session); //inserir questao no banco retornando id dele mock exemplo await 
        }
      }
    }
    catch (e) {

    }
  }

  async editCourse(course: Course) {
    try {
      if (this.formCertification.valid) {
        let certification = this.certification;
        await this.certificationService.editCertification(certification);
      }

      if (this.formTest.valid) {
        let test = this.test;
        await this.testService.editTest(test);

      }

      if (this.questions.length > 0) {
        for (let question of this.questions) {
          await this.questionService.editQuestion(question);
        }
      }

      if (this.formCourse.valid) {
        let course = this.course
        await this.courseService.editCourse(course);

      }

      if (this.sessions.length > 0) {
        for (let session of this.sessions) {
          await this.sessionService.editSession(session);
        }
      }

    }
    catch (e) {

    }
  }

  videoSessionSelected(event: any) {
    this.session.videoSession = event.target.files[0];
  }

  pdfSessionSelected(event: any) {
    this.session.pdfSession = event.target.files[0];
  }

  corporativeSignatureSelected(event: any) {
    this.certification.corporativeSignature = event.target.files[0];
  }

  courseImageSelected(event: any) {
    this.course.courseimage = event.target.files[0];
  }

  addSession(session: Session): void {

    if (this.formSession.valid)
      this.sessions.push(session);

  }

  addQuestion(question: Question): void {

    if (this.formQuestion.valid)
      this.questions.push(question);

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
      courseDuration: new FormControl(this.course.durationTime, [
        Validators.required,
        this.forbiddenDurationTimeValidator(/0/i)
      ]),
      courseDescription: new FormControl(this.course.description, [
        Validators.required,
      ]),
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
      const arrayFile = control.value;
      let error: string = '';

      if (arrayFile.length > 0) {
        if (arrayFile[0].type === '')
          return { forbiddenSendFile: error }
      }

      return null;
    };
  }

  createFormSessionValidation(): void {
    this.formSession = new FormGroup({
      sessionTitle: new FormControl(this.session.sessionTitle, [
        Validators.required,
      ]),
      sessionVideoFile: new FormControl(this.session.videoSession, [
        this.forbiddenSendFileValidator,
      ]),
      sessionPDFFile: new FormControl(this.session.pdfSession, [
        this.forbiddenSendFileValidator,
      ]),
      sessionDescription: new FormControl(this.session.description, [
        Validators.required,
      ]),
    });

  }

  createFormCertificationValidation(): void {
    this.formCertification = new FormGroup({
      certificationTitle: new FormControl(this.certification.certificationTitle, [
        Validators.required,
      ]),
      corporativeSignatureFile: new FormControl(this.certification.corporativeSignature, [
        this.forbiddenSendFileValidator,
      ]),
      certificationDescription: new FormControl(this.certification.description, [
        Validators.required,
      ]),
    });

  }

  createFormTestValidation(): void {
    this.formTest = new FormGroup({
      testDuration: new FormControl(this.test.durationTime, [
        Validators.required,
        this.forbiddenDurationTimeValidator(/0/i)
      ]),
      testDifficulty: new FormControl(this.test.difficulty, [
        Validators.required,
      ]),
      testApproval: new FormControl(this.test.approvalPercentual, [
        Validators.required,
      ]),
    });

  }

  createFormQuestionValidation(): void {
    this.formQuestion = new FormGroup({
      testQuestion: new FormControl(this.question.question, [
        Validators.required,
      ]),
      testCorrectAnswer: new FormControl(this.question.correctAnswer, [
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
