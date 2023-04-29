import { TestBed } from '@angular/core/testing';

import { LikeCustomerService } from './like-customer.service';

describe('LikeCustomerService', () => {
  let service: LikeCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LikeCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
