import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientToHealthInsuranceFeedbackComponent } from './patient-to-health-insurance-feedback.component';

describe('PatientToHealthInsuranceFeedbackComponent', () => {
  let component: PatientToHealthInsuranceFeedbackComponent;
  let fixture: ComponentFixture<PatientToHealthInsuranceFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientToHealthInsuranceFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientToHealthInsuranceFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
