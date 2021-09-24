import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorTransactionHistoryComponent } from './doctor-transaction-history.component';

describe('DoctorTransactionHistoryComponent', () => {
  let component: DoctorTransactionHistoryComponent;
  let fixture: ComponentFixture<DoctorTransactionHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorTransactionHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorTransactionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
