import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthInsuranceRegistrationComponent } from './health-insurance-registration.component';

describe('HealthInsuranceRegistrationComponent', () => {
  let component: HealthInsuranceRegistrationComponent;
  let fixture: ComponentFixture<HealthInsuranceRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthInsuranceRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthInsuranceRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
