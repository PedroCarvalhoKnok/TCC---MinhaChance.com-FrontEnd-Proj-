import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVacancyListChartComponent } from './user-vacancy-list-chart.component';

describe('UserVacancyListChartComponent', () => {
  let component: UserVacancyListChartComponent;
  let fixture: ComponentFixture<UserVacancyListChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserVacancyListChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserVacancyListChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
