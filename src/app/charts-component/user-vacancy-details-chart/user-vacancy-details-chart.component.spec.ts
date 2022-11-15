import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVacancyDetailsChartComponent } from './user-vacancy-details-chart.component';

describe('UserVacancyDetailsChartComponent', () => {
  let component: UserVacancyDetailsChartComponent;
  let fixture: ComponentFixture<UserVacancyDetailsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserVacancyDetailsChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserVacancyDetailsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
