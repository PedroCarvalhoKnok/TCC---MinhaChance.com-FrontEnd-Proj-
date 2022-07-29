import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-courses-register',
  templateUrl: './courses-register.component.html',
  styleUrls: ['./courses-register.component.scss']
})
export class CoursesRegisterComponent implements OnInit {

  formCourse: FormGroup = new FormGroup({});
  formSession: FormGroup = new FormGroup({});
  formCertification: FormGroup = new FormGroup({});
  formTest: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
