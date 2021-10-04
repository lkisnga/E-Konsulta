import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPatientsChatComponent } from './doctor-patients-chat.component';

describe('DoctorPatientsChatComponent', () => {
  let component: DoctorPatientsChatComponent;
  let fixture: ComponentFixture<DoctorPatientsChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorPatientsChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorPatientsChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
