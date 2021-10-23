import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabPartnerFeedbackComponent } from './lab-partner-feedback.component';

describe('LabPartnerFeedbackComponent', () => {
  let component: LabPartnerFeedbackComponent;
  let fixture: ComponentFixture<LabPartnerFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabPartnerFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabPartnerFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
