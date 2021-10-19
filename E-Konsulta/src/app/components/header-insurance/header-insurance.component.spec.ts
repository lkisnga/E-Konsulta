import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderInsuranceComponent } from './header-insurance.component';

describe('HeaderInsuranceComponent', () => {
  let component: HeaderInsuranceComponent;
  let fixture: ComponentFixture<HeaderInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
