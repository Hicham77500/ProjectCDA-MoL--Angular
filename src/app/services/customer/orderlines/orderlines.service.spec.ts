import { TestBed } from '@angular/core/testing';

import { OrderlinesService } from './orderlines.service';

describe('OrderlinesService', () => {
  let service: OrderlinesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderlinesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
