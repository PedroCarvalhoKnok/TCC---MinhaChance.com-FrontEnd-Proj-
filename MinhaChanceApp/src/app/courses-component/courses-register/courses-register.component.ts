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

  courseId!: number;

  filesTobeDeleted!: any[];
  objectsTobeDeleted!: any[];

  constructor(private router: ActivatedRoute, private formBuilder: FormBuilder, private blobService: AzureBlobStorageService, private certificationService: CertificationService, private courseService: CourseService, private testService: TestService, private sessionService: SessionService, private questionService: QuestionService) {

  }

  async ngOnInit(): Promise<void> {
    let courseId = this.router.snapshot.params?.['courseId'];
    //console.log(courseId); usar para carregar edição de curso
    this.courseId = courseId;

    this.createFormCourseValidation();
    this.createFormSessionValidation();
    this.createFormCertificationValidation();
    this.createFormTestValidation();
    this.createFormQuestionValidation();

    if (courseId != undefined) {

      let courseSelected = await this.courseService.getCourseById(courseId);
      courseSelected.subscribe(async course => {
        this.course.courseTitle = course.courseTitle;
        this.course.vacancyId = course.vacancyId;
        this.course.durationTime = course.durationTime;
        this.hasCertification = course.Certication != null || undefined ? true : false;
        this.hasTest = course.Test != null || undefined ? true : false;
        this.course.description = course.description;
        this.course.id = courseId;

        this.sessions = course.Sessions;
        course.Sessions.forEach(async session => {
          this.session.videoPath = await this.blobService.getFile('', 'CoursesVideos', session.videoSessionName, session.id);
          this.session.pdfPath = await this.blobService.getFile('', 'CoursesPDFs', session.pdfSessionName, session.id);
        });

        this.certification.certificationTitle = course.Certification.certificationTitle;
        this.certification.description = course.Certification.description;
        this.certification.id = course.Certification.id;
        this.certification.corporativeSignaturePath = await this.blobService.getFile('', 'CorporativeSignatures', course.Certification.corporativeSignatureName, courseId);

        this.test.approvalPercentual = course.Test.approvalPercentual;
        this.test.certificationId = course.Test.certificationId;
        this.test.durationTime = course.Test.durationTime;
        this.test.questionsQuantity = course.Test.questionsQuantity;
        this.test.id = course.Test.id;

        this.questions = course.Test.Questions;


      });

    }


  }

  async registerCourse() {
    try {
      let test: Test = new Test();
      let certification: Certification = new Certification();

      let retornoIdCertification: number = 0;
      let retornoIdTest: number = 0;
      let retornoIdCurso: number = 0;
      let retornoIdSessao: number = 0;

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

        await this.courseService.postCourse(course).subscribe(courseId => { retornoIdCurso = courseId }); //inserir curso no banco retornando id dele mock exemplo await 

      }
      if (this.sessions.length > 0) {
        for (let session of this.sessions) {
          if (retornoIdCurso != 0 || retornoIdCurso != undefined)
            session.courseId = retornoIdCurso


          await this.sessionService.postSession(session).subscribe(sessionId => { retornoIdSessao = sessionId }); //inserir questao no banco retornando id dele mock exemplo await 
          await this.blobService.uploadFile('', session.pdfSession, `${session.pdfSession.name}/${retornoIdSessao}`, 'CoursesPDFs', () => { });
          await this.blobService.uploadFile('', session.videoSession, `${session.videoSession.name}/${retornoIdSessao}`, 'CoursesVideos', () => { });
        }
      }

      if (retornoIdCertification != 0 || retornoIdCertification != undefined)
        await this.blobService.uploadFile('', certification.corporativeSignature, `${certification.corporativeSignatureName}/${retornoIdCurso}`, 'CorporativeSignatures', () => { });

    }
    catch (e) {

    }
  }

  async editCourse(course: Course) {
    try {

      this.deleteFilesToBeDeleted();
      this.deleteObjectsToBeDeleted();

      if (this.formCertification.valid) {
        let certification = this.certification;
        await this.certificationService.editCertification(certification);
        await this.blobService.uploadFile('', certification.corporativeSignature, `${certification.corporativeSignatureName}/${course.id}`, 'CorporativeSignatures', () => { });

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
        course = this.course
        await this.courseService.editCourse(course);

      }

      if (this.sessions.length > 0) {
        for (let session of this.sessions) {
          await this.sessionService.editSession(session);
          await this.blobService.uploadFile('', session.pdfSession, `${session.pdfSessionName}/${session.id}`, 'CoursesPDFs', () => { });
          await this.blobService.uploadFile('', session.videoSession, `${session.videoSessionName}/${session.id}`, 'CoursesVideos', () => { });
        }
      }


    }
    catch (e) {

    }
  }

  async deleteObjectsToBeDeleted() {
    if (this.objectsTobeDeleted.length > 0) {
      this.objectsTobeDeleted.forEach(async item => {
        switch (item.type) {
          case 'certification':
            await this.certificationService.deleteCertification(item.id).subscribe(isDeleted => isDeleted = isDeleted);
            break;
          case 'session':
            await this.sessionService.deleteSession(item.id).subscribe(isDeleted => isDeleted = isDeleted);
            break;
          case 'question':
            await this.questionService.deleteQuestion(item.id).subscribe(isDeleted => isDeleted = isDeleted);
            break;
          case 'test':
            await this.testService.deleteTest(item.id).subscribe(isDeleted => isDeleted = isDeleted);
            break;

        }
      });
    }
  }

  deleteFilesToBeDeleted() {
    if (this.filesTobeDeleted.length > 0) {
      this.filesTobeDeleted.forEach(file => {
        switch (file.type) {
          case 'signature':
            this.blobService.deleteFile('', `${file.file.corporativeSignatureName}/${file.id}`, 'CorporativeSignatures', () => { })
            break;
          case 'video':
            this.blobService.deleteFile('', `${file.file.videoSessionName}/${file.id}`, 'CoursesVideos', () => { })
            break;
          case 'pdf':
            this.blobService.deleteFile('', `${file.file.pdfSessionName}/${file.id}`, 'CoursesPDFs', () => { })
            break;
        }
      })
    }
  }

  videoSessionSelected(event: any) {
    this.session.videoSession = event.target.files[0];
    this.session.videoSessionName = event.target.files[0].name;
  }

  pdfSessionSelected(event: any) {
    this.session.pdfSession = event.target.files[0];
    this.session.pdfSessionName = event.target.files[0].name;
  }

  corporativeSignatureSelected(event: any) {
    this.certification.corporativeSignature = event.target.files[0];
    this.certification.corporativeSignatureName = event.target.files[0].name;
  }

  courseImageSelected(event: any) {
    this.course.courseimage = event.target.files[0];
  }


  async deleteCourseItem(courseItem: any) {
    
    if (Object.getPrototypeOf(courseItem) === Certification.prototype) {

      this.objectsTobeDeleted.push({ id: courseItem.id, type: 'certification' });

      (<HTMLInputElement>document.getElementById('certificationTitle')).value = '';
      (<HTMLInputElement>document.getElementById('certificationDescription')).value = '';
      this.cleanCorporativeSignature();
    }
    else {

      this.objectsTobeDeleted.push({ id: courseItem.id, type: 'test' });

      (<HTMLInputElement>document.getElementById('testDuration')).value = '';
      (<HTMLInputElement>document.getElementById('testDifficulty')).value = '';
      (<HTMLInputElement>document.getElementById('testAppPercentual')).value = '';
    }

    if (Object.getPrototypeOf(courseItem) === Certification.prototype) {
      this.blobService.deleteFile('', `${courseItem.corporativeSignatureName}/${courseItem.id}`, 'CorporativeSignatures', () => { })
      this.cleanCorporativeSignature();
    }
  }

  cleanCorporativeSignature() {
    if (this.courseId != undefined)
      this.filesTobeDeleted.push({ file: this.certification.corporativeSignature, type: 'signature', id: this.courseId });

    this.certification.corporativeSignature = new File([], "", {
      type: "",
    });
    this.certification.corporativeSignatureName = '';
    (<HTMLInputElement>document.getElementById('assign-file-id')).value = '';

  }


  cleanSession(typeFile: string) {
    if (typeFile == 'video') {
      this.session.videoSession = new File([], "", {
        type: "",
      });
      this.session.videoSessionName = '';
      (<HTMLInputElement>document.getElementById('input-file-video')).value = '';
    }
    else {
      this.session.pdfSession = new File([], "", {
        type: "",
      });;
      this.session.pdfSessionName = '';
      (<HTMLInputElement>document.getElementById('input-file-pdf')).value = '';

    }
  }

  cleanSessionIndexed(index: number, typeFile: string) {
    if (typeFile == 'video') {
      if (this.courseId != undefined)
        this.filesTobeDeleted.push({ file: this.sessions[index].videoSession, type: 'video', id: this.sessions[index].id });

      this.sessions[index].videoSession = new File([], "", {
        type: "",
      });
      this.sessions[index].videoSessionName = '';

    }
    else {
      if (this.courseId != undefined)
        this.filesTobeDeleted.push({ file: this.sessions[index].pdfSession, type: 'pdf', id: this.sessions[index].id });

      this.sessions[index].pdfSession = new File([], "", {
        type: "",
      });
      this.sessions[index].pdfSessionName = '';

    }

    (<HTMLInputElement>document.getElementById(`input-${typeFile}-${index}`)).value = '';

  }

  editSessionIndexed(index: number) {
    this.sessions[index].sessionTitle = (<HTMLInputElement>document.getElementById(`input-sessionTitle-${index}`)).value;
    this.sessions[index].videoSession = (<any>document.getElementById(`input-video-${index}`)).target.files[0];
    this.sessions[index].pdfSession = (<any>document.getElementById(`input-pdf-${index}`)).target.files[0];
    this.sessions[index].description = (<HTMLInputElement>document.getElementById(`input-descriptionSession-${index}`)).value;

  }

  editQuestionIndexed(index: number) {
    this.questions[index].question = (<HTMLInputElement>document.getElementById(`questionDescription-${index}`)).value;
    this.questions[index].correctAnswer = (<HTMLInputElement>document.getElementById(`correctAnswer-${index}`)).value;
    this.questions[index].answerA = (<HTMLInputElement>document.getElementById(`answerA-${index}`)).value;
    this.questions[index].answerB = (<HTMLInputElement>document.getElementById(`answerB-${index}`)).value;
    this.questions[index].answerC = (<HTMLInputElement>document.getElementById(`answerC-${index}`)).value;
    this.questions[index].answerD = (<HTMLInputElement>document.getElementById(`answerD-${index}`)).value;
    this.questions[index].answerE = (<HTMLInputElement>document.getElementById(`answerE-${index}`)).value;
  }

  deleteQuestionIndexed(index: number) {
    let isDeleted: boolean;
    if (this.courseId != undefined)
      this.objectsTobeDeleted.push({ id: this.questions[index].id, type: 'question' })
    else
      delete this.questions[index];

    //modal msg de exclusao da sessao

  }

  deleteSessionIndexed(index: number) {
    let isDeleted: boolean;
    if (this.courseId != undefined)
      this.objectsTobeDeleted.push({ id: this.sessions[index].id, type: 'session' })
    else
      delete this.sessions[index];

    //modal msg de exclusao da sessao

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
