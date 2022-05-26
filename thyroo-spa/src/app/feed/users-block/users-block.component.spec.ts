/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UsersBlockComponent } from './users-block.component';

describe('UsersBlockComponent', () => {
  let component: UsersBlockComponent;
  let fixture: ComponentFixture<UsersBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
