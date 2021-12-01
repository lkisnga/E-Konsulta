import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthInsuranceReceivedLoaComponent } from './health-insurance-received-loa.component';

describe('HealthInsuranceReceivedLoaComponent', () => {
  let component: HealthInsuranceReceivedLoaComponent;
  let fixture: ComponentFixture<HealthInsuranceReceivedLoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthInsuranceReceivedLoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthInsuranceReceivedLoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
