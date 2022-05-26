/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdvertisingService } from './advertising.service';

describe('Service: Advertising', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdvertisingService]
    });
  });

  it('should ...', inject([AdvertisingService], (service: AdvertisingService) => {
    expect(service).toBeTruthy();
  }));
});
