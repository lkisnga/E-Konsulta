import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabPartnerSidenavComponent } from './lab-partner-sidenav.component';

describe('LabPartnerSidenavComponent', () => {
  let component: LabPartnerSidenavComponent;
  let fixture: ComponentFixture<LabPartnerSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabPartnerSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabPartnerSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
