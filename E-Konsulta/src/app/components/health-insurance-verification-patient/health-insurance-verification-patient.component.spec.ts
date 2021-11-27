import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthInsuranceVerificationPatientComponent } from './health-insurance-verification-patient.component';

describe('HealthInsuranceVerificationPatientComponent', () => {
  let component: HealthInsuranceVerificationPatientComponent;
  let fixture: ComponentFixture<HealthInsuranceVerificationPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthInsuranceVerificationPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthInsuranceVerificationPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
