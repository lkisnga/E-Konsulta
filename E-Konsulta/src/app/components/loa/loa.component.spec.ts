import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaComponent } from './loa.component';

describe('LoaComponent', () => {
  let component: LoaComponent;
  let fixture: ComponentFixture<LoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
