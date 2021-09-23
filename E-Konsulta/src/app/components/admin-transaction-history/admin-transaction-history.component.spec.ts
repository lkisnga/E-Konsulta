import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTransactionHistoryComponent } from './admin-transaction-history.component';

describe('AdminTransactionHistoryComponent', () => {
  let component: AdminTransactionHistoryComponent;
  let fixture: ComponentFixture<AdminTransactionHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTransactionHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTransactionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
