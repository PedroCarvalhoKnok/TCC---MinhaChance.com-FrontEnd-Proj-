import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsTestComponent } from './skills-test.component';

describe('SkillsTestComponent', () => {
  let component: SkillsTestComponent;
  let fixture: ComponentFixture<SkillsTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
