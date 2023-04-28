import { TestBed } from '@angular/core/testing';

import { PostCustomerService } from './post-customer.service';

describe('PostCustomerService', () => {
  let service: PostCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
