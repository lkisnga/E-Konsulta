import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthInsuranceReviewsComponent } from './health-insurance-reviews.component';

describe('HealthInsuranceReviewsComponent', () => {
  let component: HealthInsuranceReviewsComponent;
  let fixture: ComponentFixture<HealthInsuranceReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthInsuranceReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthInsuranceReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
