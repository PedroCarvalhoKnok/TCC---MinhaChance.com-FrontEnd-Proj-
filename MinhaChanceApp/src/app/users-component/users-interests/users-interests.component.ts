import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Interest } from 'src/app/Models/User/Interest';
import { User } from 'src/app/Models/User/User';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-users-interests',
  templateUrl: './users-interests.component.html',
  styleUrls: ['./users-interests.component.scss']
})
export class UsersInterestsComponent implements OnInit {

  formUserInterest!: FormGroup;
  user: User = new User();
  userId: number;
  interest: Interest = new Interest();
  interests: Interest[] = [];
  @Output() sendInterestEvent = new EventEmitter<User>();

  constructor(private router: ActivatedRoute, private userService: UserService) { }

  async ngOnInit() {
    this.createFormUserInterestsValidation();

    this.userId = this.router.snapshot.params?.['userId'];

    if(this.userId){

      await this.userService.getCandidateInfoById(this.userId).subscribe(user => {
        this.interests = user.interests;
      })
      
    }
  }

  addInterest() {
    if (this.formUserInterest.valid) {
      this.interest.description = (<HTMLInputElement>(document.getElementById('interestDescription'))).value;
      this.interests.push(this.interest);
    }
  }

  removeInterest() {
    this.interests.pop();
  }

  editInterestByIndex(index: number){
    this.interests[index].description = (<HTMLInputElement>(document.getElementById('interestDescription'))).value;
  }

  removeInterestByIndex(index: number){
    delete this.interests[index];
  }

  sendUserInterests() {
    if (this.formUserInterest.valid) {

      this.user.interests = this.interests;

      this.sendInterestEvent.emit(this.user);


    }
  }


  createFormUserInterestsValidation(): void {
    this.formUserInterest = new FormGroup({
      description: new FormControl(this.interest.description, [
        Validators.required
      ])
    });

  }
}
