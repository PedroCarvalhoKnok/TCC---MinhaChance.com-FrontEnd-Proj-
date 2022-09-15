import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/Models/User/User';

@Component({
  selector: 'app-user-vacancy-list-dialog',
  templateUrl: './user-vacancy-list-dialog.component.html',
  styleUrls: ['./user-vacancy-list-dialog.component.scss']
})
export class UserVacancyListDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: User) { }

  ngOnInit(): void {
  }

}
