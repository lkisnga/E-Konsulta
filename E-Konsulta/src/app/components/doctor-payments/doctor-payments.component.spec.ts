import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPaymentsComponent } from './doctor-payments.component';

describe('DoctorPaymentsComponent', () => {
  let component: DoctorPaymentsComponent;
  let fixture: ComponentFixture<DoctorPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
