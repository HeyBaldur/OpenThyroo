/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddBusinessInterestsComponent } from './add-business-interests.component';

describe('AddBusinessInterestsComponent', () => {
  let component: AddBusinessInterestsComponent;
  let fixture: ComponentFixture<AddBusinessInterestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBusinessInterestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBusinessInterestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
