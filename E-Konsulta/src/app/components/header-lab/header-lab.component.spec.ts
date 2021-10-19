import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLabComponent } from './header-lab.component';

describe('HeaderLabComponent', () => {
  let component: HeaderLabComponent;
  let fixture: ComponentFixture<HeaderLabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderLabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
