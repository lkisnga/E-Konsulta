import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfLabPartnersComponent } from './list-of-lab-partners.component';

describe('ListOfLabPartnersComponent', () => {
  let component: ListOfLabPartnersComponent;
  let fixture: ComponentFixture<ListOfLabPartnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfLabPartnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfLabPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
