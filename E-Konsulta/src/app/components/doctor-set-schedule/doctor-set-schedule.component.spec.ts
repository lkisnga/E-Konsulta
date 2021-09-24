import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSetScheduleComponent } from './doctor-set-schedule.component';

describe('DoctorSetScheduleComponent', () => {
  let component: DoctorSetScheduleComponent;
  let fixture: ComponentFixture<DoctorSetScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorSetScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorSetScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
