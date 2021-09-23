import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHealthInsuranceComponent } from './admin-health-insurance.component';

describe('AdminHealthInsuranceComponent', () => {
  let component: AdminHealthInsuranceComponent;
  let fixture: ComponentFixture<AdminHealthInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHealthInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHealthInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
