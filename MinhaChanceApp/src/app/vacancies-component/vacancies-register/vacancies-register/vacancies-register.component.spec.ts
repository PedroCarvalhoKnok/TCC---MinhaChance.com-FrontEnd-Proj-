import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacanciesRegisterComponent } from './vacancies-register.component';

describe('VacanciesRegisterComponent', () => {
  let component: VacanciesRegisterComponent;
  let fixture: ComponentFixture<VacanciesRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacanciesRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacanciesRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
