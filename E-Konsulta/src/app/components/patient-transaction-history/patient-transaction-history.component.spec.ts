import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientTransactionHistoryComponent } from './patient-transaction-history.component';

describe('PatientTransactionHistoryComponent', () => {
  let component: PatientTransactionHistoryComponent;
  let fixture: ComponentFixture<PatientTransactionHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientTransactionHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientTransactionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
