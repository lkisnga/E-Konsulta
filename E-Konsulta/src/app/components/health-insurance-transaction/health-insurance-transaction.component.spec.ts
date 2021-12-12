import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthInsuranceTransactionComponent } from './health-insurance-transaction.component';

describe('HealthInsuranceTransactionComponent', () => {
  let component: HealthInsuranceTransactionComponent;
  let fixture: ComponentFixture<HealthInsuranceTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthInsuranceTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthInsuranceTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
