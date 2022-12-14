/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpCacheService } from './http-cache.service';

describe('Service: HttpCache', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpCacheService]
    });
  });

  it('should ...', inject([HttpCacheService], (service: HttpCacheService) => {
    expect(service).toBeTruthy();
  }));
});
