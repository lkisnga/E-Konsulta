import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthInsuranceVerificationComponent } from './health-insurance-verification.component';

describe('HealthInsuranceVerificationComponent', () => {
  let component: HealthInsuranceVerificationComponent;
  let fixture: ComponentFixture<HealthInsuranceVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthInsuranceVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthInsuranceVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
