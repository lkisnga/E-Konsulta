import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDoctorsListComponent } from './patient-doctors-list.component';

describe('PatientDoctorsListComponent', () => {
  let component: PatientDoctorsListComponent;
  let fixture: ComponentFixture<PatientDoctorsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientDoctorsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDoctorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
