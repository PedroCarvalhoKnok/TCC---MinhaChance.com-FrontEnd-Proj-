import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersInterestsComponent } from './users-interests.component';

describe('UsersInterestsComponent', () => {
  let component: UsersInterestsComponent;
  let fixture: ComponentFixture<UsersInterestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersInterestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersInterestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
