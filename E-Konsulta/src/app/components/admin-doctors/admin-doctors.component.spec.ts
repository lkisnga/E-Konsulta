import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDoctorsComponent } from './admin-doctors.component';

describe('AdminDoctorsComponent', () => {
  let component: AdminDoctorsComponent;
  let fixture: ComponentFixture<AdminDoctorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDoctorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
