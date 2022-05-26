/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FeedHomeByCatComponent } from './feed-home-by-cat.component';

describe('FeedHomeByCatComponent', () => {
  let component: FeedHomeByCatComponent;
  let fixture: ComponentFixture<FeedHomeByCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedHomeByCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedHomeByCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
