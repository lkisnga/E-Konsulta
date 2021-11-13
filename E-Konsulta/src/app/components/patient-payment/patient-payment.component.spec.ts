import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPaymentComponent } from './patient-payment.component';

describe('PatientPaymentComponent', () => {
  let component: PatientPaymentComponent;
  let fixture: ComponentFixture<PatientPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
