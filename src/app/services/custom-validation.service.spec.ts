/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomValidationService } from './custom-validation.service';

describe('Service: CustomValidation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomValidationService]
    });
  });

  it('should ...', inject([CustomValidationService], (service: CustomValidationService) => {
    expect(service).toBeTruthy();
  }));
});
