import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mockData } from './mock-data/arbitrum-txcount-history-20210914';
import { TransactionsPerDay } from './common-classes';

@Injectable({
  providedIn: 'root'
})
export class EthereumTxDataService {
  // private arbiscanUrl = `https://arbiscan.io/chart/tx?output=csv`;
  private headers: HttpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  //private baseUrl = `https://api.ethtps.info/API`;
  private baseUrl = `/API`;

  private ethTpsUrl = `${this.baseUrl}/GetTPS?provider=Ethereum&interval=OneHour`;

  constructor(private http: HttpClient) { }

  public getTxPerDayCount() {
    //return this.http.get(this.ethTpsUrl);
    return this.http.get(this.ethTpsUrl, { headers: this.headers });
  }

  public getMockTxCount(): TransactionsPerDay[] {
    return mockData.map(entry => ({ date: new Date(entry.date), unixTime: entry.unixTime, txCount: entry.txCount }));
  }
}
