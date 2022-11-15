import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInteligenceDetailsChartComponent } from './user-inteligence-details-chart.component';

describe('UserInteligenceDetailsChartComponent', () => {
  let component: UserInteligenceDetailsChartComponent;
  let fixture: ComponentFixture<UserInteligenceDetailsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInteligenceDetailsChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInteligenceDetailsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
