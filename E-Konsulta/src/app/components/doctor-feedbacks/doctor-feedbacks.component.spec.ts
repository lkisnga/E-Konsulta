import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorFeedbacksComponent } from './doctor-feedbacks.component';

describe('DoctorFeedbacksComponent', () => {
  let component: DoctorFeedbacksComponent;
  let fixture: ComponentFixture<DoctorFeedbacksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorFeedbacksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorFeedbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
