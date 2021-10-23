import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientToDoctorFeedbackComponent } from './patient-to-doctor-feedback.component';

describe('PatientToDoctorFeedbackComponent', () => {
  let component: PatientToDoctorFeedbackComponent;
  let fixture: ComponentFixture<PatientToDoctorFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientToDoctorFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientToDoctorFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
