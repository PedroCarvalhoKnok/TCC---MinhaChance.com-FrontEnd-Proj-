import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInteligenceResultChartComponent } from './user-inteligence-result-chart.component';

describe('UserInteligenceResultChartComponent', () => {
  let component: UserInteligenceResultChartComponent;
  let fixture: ComponentFixture<UserInteligenceResultChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInteligenceResultChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInteligenceResultChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
