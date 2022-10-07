import { Component, OnInit } from '@angular/core';
import { Graduation } from 'src/app/Models/User/AcademicGraduation';
import { Address } from 'src/app/Models/User/Address';
import { UserCertification } from 'src/app/Models/User/Certification';
import { Experiences } from 'src/app/Models/User/Experiences';
import { Interest } from 'src/app/Models/User/Interest';
import { User } from 'src/app/Models/User/User';

@Component({
  selector: 'app-users-register',
  templateUrl: './users-register.component.html',
  styleUrls: ['./users-register.component.scss']
})
export class UsersRegisterComponent implements OnInit {

  user: User = new User();
  address: Address = new Address();
  experience: Experiences = new Experiences();
  graduation: Graduation = new Graduation();
  certification: UserCertification = new UserCertification();
  interest: Interest = new Interest();

  constructor() { }

  ngOnInit(): void {
  }




}
