import { TestBed } from '@angular/core/testing';

import { HeartCustomerService } from './heart-customer.service';

describe('HeartCustomerService', () => {
  let service: HeartCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeartCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
