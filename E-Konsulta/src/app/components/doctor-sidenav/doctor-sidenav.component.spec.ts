import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSidenavComponent } from './doctor-sidenav.component';

describe('DoctorSidenavComponent', () => {
  let component: DoctorSidenavComponent;
  let fixture: ComponentFixture<DoctorSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
