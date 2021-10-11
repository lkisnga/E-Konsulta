import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabPartnerRegistrationComponent } from './lab-partner-registration.component';

describe('LabPartnerRegistrationComponent', () => {
  let component: LabPartnerRegistrationComponent;
  let fixture: ComponentFixture<LabPartnerRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabPartnerRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabPartnerRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
