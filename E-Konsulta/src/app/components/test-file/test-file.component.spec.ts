import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFileComponent } from './test-file.component';

describe('TestFileComponent', () => {
  let component: TestFileComponent;
  let fixture: ComponentFixture<TestFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
