import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mockData } from './mock-data/arbitrum-txcount-history-20210914';

export interface transactionsPerDay {
  date : Date;
  unixTime : number;
  txCount : number;
}

@Injectable({
  providedIn: 'root'
})
export class ArbitrumTxDataService {
  private arbiscanUrl = `https://arbiscan.io/chart/tx?output=csv`;
  private headers : HttpHeaders = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')
  .set('Referrer-Policy', 'origin-when-cross-origin')
  .set('Accept-Encoding', 'br');



  constructor(private http: HttpClient) { }

  public getTxPerDayCount()  {
    return this.http.get(this.arbiscanUrl,  { headers: this.headers });
  }

  public getMockTxCount() : transactionsPerDay[]{
    return mockData.map(entry => ({date: new Date(entry.date), unixTime: entry.unixTime, txCount: entry.txCount}));
  }
}
