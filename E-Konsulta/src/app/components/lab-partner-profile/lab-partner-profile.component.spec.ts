import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabPartnerProfileComponent } from './lab-partner-profile.component';

describe('LabPartnerProfileComponent', () => {
  let component: LabPartnerProfileComponent;
  let fixture: ComponentFixture<LabPartnerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabPartnerProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabPartnerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
