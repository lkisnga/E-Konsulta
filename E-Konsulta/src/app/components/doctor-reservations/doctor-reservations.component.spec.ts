import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorReservationsComponent } from './doctor-reservations.component';

describe('DoctorReservationsComponent', () => {
  let component: DoctorReservationsComponent;
  let fixture: ComponentFixture<DoctorReservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorReservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
