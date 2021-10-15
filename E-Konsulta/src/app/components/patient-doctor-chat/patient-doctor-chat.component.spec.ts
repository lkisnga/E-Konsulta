import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDoctorChatComponent } from './patient-doctor-chat.component';

describe('PatientDoctorChatComponent', () => {
  let component: PatientDoctorChatComponent;
  let fixture: ComponentFixture<PatientDoctorChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientDoctorChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDoctorChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
