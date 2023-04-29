import { TestBed } from '@angular/core/testing';

import { PictureCustomerService } from './picture-customer.service';

describe('PictureCustomerService', () => {
  let service: PictureCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PictureCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
