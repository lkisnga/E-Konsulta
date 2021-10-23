import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfDoctorsComponent } from './list-of-doctors.component';

describe('ListOfDoctorsComponent', () => {
  let component: ListOfDoctorsComponent;
  let fixture: ComponentFixture<ListOfDoctorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfDoctorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
