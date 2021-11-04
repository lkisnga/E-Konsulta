import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDoctorsListViewComponent } from './patient-doctors-list-view.component';

describe('PatientDoctorsListViewComponent', () => {
  let component: PatientDoctorsListViewComponent;
  let fixture: ComponentFixture<PatientDoctorsListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientDoctorsListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDoctorsListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
