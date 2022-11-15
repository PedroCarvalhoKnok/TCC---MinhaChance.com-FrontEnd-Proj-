import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVacancyDetailsDialogComponent } from './user-vacancy-details-dialog.component';

describe('UserVacancyDetailsDialogComponent', () => {
  let component: UserVacancyDetailsDialogComponent;
  let fixture: ComponentFixture<UserVacancyDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserVacancyDetailsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserVacancyDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
