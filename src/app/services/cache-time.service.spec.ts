/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CacheTimeService } from './cache-time.service';

describe('Service: CacheTime', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CacheTimeService]
    });
  });

  it('should ...', inject([CacheTimeService], (service: CacheTimeService) => {
    expect(service).toBeTruthy();
  }));
});
