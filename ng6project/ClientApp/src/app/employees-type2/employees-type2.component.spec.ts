import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesType2Component } from './employees-type2.component';

describe('EmployeesType2Component', () => {
  let component: EmployeesType2Component;
  let fixture: ComponentFixture<EmployeesType2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesType2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesType2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
