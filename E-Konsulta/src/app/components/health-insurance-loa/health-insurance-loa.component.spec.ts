import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthInsuranceLoaComponent } from './health-insurance-loa.component';

describe('HealthInsuranceLoaComponent', () => {
  let component: HealthInsuranceLoaComponent;
  let fixture: ComponentFixture<HealthInsuranceLoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthInsuranceLoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthInsuranceLoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
