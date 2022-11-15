import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVacancyListDialogComponent } from './user-vacancy-list-dialog.component';

describe('UserVacancyListDialogComponent', () => {
  let component: UserVacancyListDialogComponent;
  let fixture: ComponentFixture<UserVacancyListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserVacancyListDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserVacancyListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
