import { TestBed } from '@angular/core/testing';

import { ChatCustomerService } from './chat-customer.service';

describe('ChatCustomerService', () => {
  let service: ChatCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
