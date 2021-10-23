import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientToLabPartnerFeedbackComponent } from './patient-to-lab-partner-feedback.component';

describe('PatientToLabPartnerFeedbackComponent', () => {
  let component: PatientToLabPartnerFeedbackComponent;
  let fixture: ComponentFixture<PatientToLabPartnerFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientToLabPartnerFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientToLabPartnerFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
