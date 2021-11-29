import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabPartnerLoaComponent } from './lab-partner-loa.component';

describe('LabPartnerLoaComponent', () => {
  let component: LabPartnerLoaComponent;
  let fixture: ComponentFixture<LabPartnerLoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabPartnerLoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabPartnerLoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
