/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VerifiedBadgeGoldSmComponent } from './verified-badge-gold-sm.component';

describe('VerifiedBadgeGoldSmComponent', () => {
  let component: VerifiedBadgeGoldSmComponent;
  let fixture: ComponentFixture<VerifiedBadgeGoldSmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifiedBadgeGoldSmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifiedBadgeGoldSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
