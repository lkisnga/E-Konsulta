import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfHealthInsuranceComponent } from './list-of-health-insurance.component';

describe('ListOfHealthInsuranceComponent', () => {
  let component: ListOfHealthInsuranceComponent;
  let fixture: ComponentFixture<ListOfHealthInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfHealthInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfHealthInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
