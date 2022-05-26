/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EmailThreadComponent } from './email-thread.component';

describe('EmailThreadComponent', () => {
  let component: EmailThreadComponent;
  let fixture: ComponentFixture<EmailThreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailThreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
