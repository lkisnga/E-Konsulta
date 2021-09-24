import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabPartnerFeedbacksComponent } from './lab-partner-feedbacks.component';

describe('LabPartnerFeedbacksComponent', () => {
  let component: LabPartnerFeedbacksComponent;
  let fixture: ComponentFixture<LabPartnerFeedbacksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabPartnerFeedbacksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabPartnerFeedbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
