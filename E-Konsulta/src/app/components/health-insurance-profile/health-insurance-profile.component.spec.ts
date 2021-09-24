import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthInsuranceProfileComponent } from './health-insurance-profile.component';

describe('HealthInsuranceProfileComponent', () => {
  let component: HealthInsuranceProfileComponent;
  let fixture: ComponentFixture<HealthInsuranceProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthInsuranceProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthInsuranceProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
