import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabPartnerReviewsComponent } from './lab-partner-reviews.component';

describe('LabPartnerReviewsComponent', () => {
  let component: LabPartnerReviewsComponent;
  let fixture: ComponentFixture<LabPartnerReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabPartnerReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabPartnerReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
