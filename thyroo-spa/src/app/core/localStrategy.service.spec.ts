/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LocalStrategyService } from './localStrategy.service';

describe('Service: LocalStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStrategyService]
    });
  });

  it('should ...', inject([LocalStrategyService], (service: LocalStrategyService) => {
    expect(service).toBeTruthy();
  }));
});
