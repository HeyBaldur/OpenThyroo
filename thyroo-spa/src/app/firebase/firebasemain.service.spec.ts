/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FirebasemainService } from './firebasemain.service';

describe('Service: Firebasemain', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebasemainService]
    });
  });

  it('should ...', inject([FirebasemainService], (service: FirebasemainService) => {
    expect(service).toBeTruthy();
  }));
});
