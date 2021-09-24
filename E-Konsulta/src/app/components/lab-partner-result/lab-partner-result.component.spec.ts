import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabPartnerResultComponent } from './lab-partner-result.component';

describe('LabPartnerResultComponent', () => {
  let component: LabPartnerResultComponent;
  let fixture: ComponentFixture<LabPartnerResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabPartnerResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabPartnerResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
