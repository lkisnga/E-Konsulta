import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorUserAnalyticsComponent } from './doctor-user-analytics.component';

describe('DoctorUserAnalyticsComponent', () => {
  let component: DoctorUserAnalyticsComponent;
  let fixture: ComponentFixture<DoctorUserAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorUserAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorUserAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
