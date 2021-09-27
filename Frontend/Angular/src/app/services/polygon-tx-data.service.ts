import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransactionsPerDay } from './common-classes';

@Injectable({
  providedIn: 'root'
})
export class PolygonTxDataService {
  private headers: HttpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  private ethTpsUrl = `/API/GetTPS?provider=Polygon&interval=OneHour`;

  constructor(private http: HttpClient) { }

  public getTxPerDayCount() {
    //return this.http.get(this.ethTpsUrl);
    return this.http.get(this.ethTpsUrl, { headers: this.headers });
  }
  public getMockTxCount() : TransactionsPerDay[]{
    return [];
  }
}
