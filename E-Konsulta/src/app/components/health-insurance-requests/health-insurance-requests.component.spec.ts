import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthInsuranceRequestsComponent } from './health-insurance-requests.component';

describe('HealthInsuranceRequestsComponent', () => {
  let component: HealthInsuranceRequestsComponent;
  let fixture: ComponentFixture<HealthInsuranceRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthInsuranceRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthInsuranceRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
