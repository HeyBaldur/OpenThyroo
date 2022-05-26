/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DeleteBusinessPreferenceConfirmationComponent } from './delete-business-preference-confirmation.component';

describe('DeleteBusinessPreferenceConfirmationComponent', () => {
  let component: DeleteBusinessPreferenceConfirmationComponent;
  let fixture: ComponentFixture<DeleteBusinessPreferenceConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteBusinessPreferenceConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBusinessPreferenceConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
