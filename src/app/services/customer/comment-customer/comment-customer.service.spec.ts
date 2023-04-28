import { TestBed } from '@angular/core/testing';

import { CommentCustomerService } from './comment-customer.service';

describe('CommentCustomerService', () => {
  let service: CommentCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
