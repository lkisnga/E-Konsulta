import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserAnalyticsComponent } from './admin-user-analytics.component';

describe('AdminUserAnalyticsComponent', () => {
  let component: AdminUserAnalyticsComponent;
  let fixture: ComponentFixture<AdminUserAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
