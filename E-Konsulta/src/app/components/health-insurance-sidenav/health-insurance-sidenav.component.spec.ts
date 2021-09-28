import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthInsuranceSidenavComponent } from './health-insurance-sidenav.component';

describe('HealthInsuranceSidenavComponent', () => {
  let component: HealthInsuranceSidenavComponent;
  let fixture: ComponentFixture<HealthInsuranceSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthInsuranceSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthInsuranceSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
