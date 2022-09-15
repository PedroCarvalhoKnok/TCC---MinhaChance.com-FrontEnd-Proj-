import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInteligenceListChartComponent } from './user-inteligence-list-chart.component';

describe('UserInteligenceListChartComponent', () => {
  let component: UserInteligenceListChartComponent;
  let fixture: ComponentFixture<UserInteligenceListChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInteligenceListChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInteligenceListChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
