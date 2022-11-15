import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsResultComponent } from './skills-result.component';

describe('SkillsResultComponent', () => {
  let component: SkillsResultComponent;
  let fixture: ComponentFixture<SkillsResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
