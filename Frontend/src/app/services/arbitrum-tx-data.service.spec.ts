import { TestBed } from '@angular/core/testing';

import { ArbitrumTxDataService } from './arbitrum-tx-data.service';

describe('ArbitrumTxDataService', () => {
  let service: ArbitrumTxDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArbitrumTxDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
