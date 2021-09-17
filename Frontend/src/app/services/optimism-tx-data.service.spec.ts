import { TestBed } from '@angular/core/testing';

import { OptimismTxDataService } from './optimism-tx-data.service';

describe('OptimismTxDataService', () => {
  let service: OptimismTxDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OptimismTxDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
