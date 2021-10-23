import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthInsuranceFeedbackComponent } from './health-insurance-feedback.component';

describe('HealthInsuranceFeedbackComponent', () => {
  let component: HealthInsuranceFeedbackComponent;
  let fixture: ComponentFixture<HealthInsuranceFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthInsuranceFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthInsuranceFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
