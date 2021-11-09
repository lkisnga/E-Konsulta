import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientVideoCallComponent } from './patient-video-call.component';

describe('PatientVideoCallComponent', () => {
  let component: PatientVideoCallComponent;
  let fixture: ComponentFixture<PatientVideoCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientVideoCallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientVideoCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
