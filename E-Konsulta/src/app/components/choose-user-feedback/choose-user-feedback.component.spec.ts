import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseUserFeedbackComponent } from './choose-user-feedback.component';

describe('ChooseUserFeedbackComponent', () => {
  let component: ChooseUserFeedbackComponent;
  let fixture: ComponentFixture<ChooseUserFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseUserFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseUserFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
