import { TestBed } from '@angular/core/testing';

import { PolygonTxDataService } from './polygon-tx-data.service';

describe('PolygonTxDataService', () => {
  let service: PolygonTxDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolygonTxDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
