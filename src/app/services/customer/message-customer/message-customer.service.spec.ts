import { TestBed } from '@angular/core/testing';

import { MessageCustomerService } from './message-customer.service';

describe('MessageCustomerService', () => {
  let service: MessageCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
