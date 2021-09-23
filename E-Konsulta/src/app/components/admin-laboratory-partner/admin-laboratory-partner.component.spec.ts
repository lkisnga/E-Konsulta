import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLaboratoryPartnerComponent } from './admin-laboratory-partner.component';

describe('AdminLaboratoryPartnerComponent', () => {
  let component: AdminLaboratoryPartnerComponent;
  let fixture: ComponentFixture<AdminLaboratoryPartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLaboratoryPartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLaboratoryPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
