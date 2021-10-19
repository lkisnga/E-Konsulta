import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPatientComponent } from './header-patient.component';

describe('HeaderPatientComponent', () => {
  let component: HeaderPatientComponent;
  let fixture: ComponentFixture<HeaderPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
