import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthInsuranceVerificationDoctorComponent } from './health-insurance-verification-doctor.component';

describe('HealthInsuranceVerificationDoctorComponent', () => {
  let component: HealthInsuranceVerificationDoctorComponent;
  let fixture: ComponentFixture<HealthInsuranceVerificationDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthInsuranceVerificationDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthInsuranceVerificationDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
