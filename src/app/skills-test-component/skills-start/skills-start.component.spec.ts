import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsStartComponent } from './skills-start.component';

describe('SkillsStartComponent', () => {
  let component: SkillsStartComponent;
  let fixture: ComponentFixture<SkillsStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsStartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
