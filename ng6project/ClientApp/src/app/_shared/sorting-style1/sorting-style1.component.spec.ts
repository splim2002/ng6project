import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingStyle1Component } from './sorting-style1.component';

describe('SortingStyle1Component', () => {
  let component: SortingStyle1Component;
  let fixture: ComponentFixture<SortingStyle1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortingStyle1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortingStyle1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
