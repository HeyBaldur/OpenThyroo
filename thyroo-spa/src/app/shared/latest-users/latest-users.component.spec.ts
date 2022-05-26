/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LatestUsersComponent } from './latest-users.component';

describe('LatestUsersComponent', () => {
  let component: LatestUsersComponent;
  let fixture: ComponentFixture<LatestUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
