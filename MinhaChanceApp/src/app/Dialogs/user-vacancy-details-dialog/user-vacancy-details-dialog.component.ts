import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/Models/User/User';

@Component({
  selector: 'app-user-vacancy-details-dialog',
  templateUrl: './user-vacancy-details-dialog.component.html',
  styleUrls: ['./user-vacancy-details-dialog.component.scss']
})
export class UserVacancyDetailsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: User) { }

  ngOnInit(): void {
  }

}
