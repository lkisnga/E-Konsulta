import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRecordsComponent } from './patient-records.component';

describe('PatientRecordsComponent', () => {
  let component: PatientRecordsComponent;
  let fixture: ComponentFixture<PatientRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
