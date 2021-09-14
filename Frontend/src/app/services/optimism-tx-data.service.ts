import { Injectable } from '@angular/core';
import {transactionsPerDay } from './arbitrum-tx-data.service'
import { mockData } from './mock-data/optimism-txcount-history-20210914';

@Injectable({
  providedIn: 'root'
})
export class OptimismTxDataService {

  constructor() { }

  public getMockTxCount() : transactionsPerDay[]{
    return mockData.map(entry => ({date: new Date(entry.date), unixTime: entry.unixTime, txCount: entry.txCount}));
  }
}
