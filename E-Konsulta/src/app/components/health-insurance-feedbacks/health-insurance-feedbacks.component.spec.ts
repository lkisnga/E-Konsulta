import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthInsuranceFeedbacksComponent } from './health-insurance-feedbacks.component';

describe('HealthInsuranceFeedbacksComponent', () => {
  let component: HealthInsuranceFeedbacksComponent;
  let fixture: ComponentFixture<HealthInsuranceFeedbacksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthInsuranceFeedbacksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthInsuranceFeedbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
