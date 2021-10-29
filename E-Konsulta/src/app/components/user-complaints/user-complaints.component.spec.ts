import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComplaintsComponent } from './user-complaints.component';

describe('UserComplaintsComponent', () => {
  let component: UserComplaintsComponent;
  let fixture: ComponentFixture<UserComplaintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComplaintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
