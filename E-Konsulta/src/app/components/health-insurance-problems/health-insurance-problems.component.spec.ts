import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthInsuranceProblemsComponent } from './health-insurance-problems.component';

describe('HealthInsuranceProblemsComponent', () => {
  let component: HealthInsuranceProblemsComponent;
  let fixture: ComponentFixture<HealthInsuranceProblemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthInsuranceProblemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthInsuranceProblemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
