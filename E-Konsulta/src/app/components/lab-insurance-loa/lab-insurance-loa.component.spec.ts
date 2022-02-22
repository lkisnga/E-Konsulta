import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabInsuranceLoaComponent } from './lab-insurance-loa.component';

describe('LabInsuranceLoaComponent', () => {
  let component: LabInsuranceLoaComponent;
  let fixture: ComponentFixture<LabInsuranceLoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabInsuranceLoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabInsuranceLoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
