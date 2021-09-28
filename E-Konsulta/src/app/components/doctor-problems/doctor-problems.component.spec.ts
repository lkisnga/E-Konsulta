import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorProblemsComponent } from './doctor-problems.component';

describe('DoctorProblemsComponent', () => {
  let component: DoctorProblemsComponent;
  let fixture: ComponentFixture<DoctorProblemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorProblemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorProblemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
