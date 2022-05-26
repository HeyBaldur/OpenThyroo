/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ContactsAsideComponent } from './contacts-aside.component';

describe('ContactsAsideComponent', () => {
  let component: ContactsAsideComponent;
  let fixture: ComponentFixture<ContactsAsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsAsideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
