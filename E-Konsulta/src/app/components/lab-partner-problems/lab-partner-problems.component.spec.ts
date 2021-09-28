import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabPartnerProblemsComponent } from './lab-partner-problems.component';

describe('LabPartnerProblemsComponent', () => {
  let component: LabPartnerProblemsComponent;
  let fixture: ComponentFixture<LabPartnerProblemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabPartnerProblemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabPartnerProblemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
