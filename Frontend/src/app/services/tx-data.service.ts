import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransactionsPerDay } from './common-classes';

@Injectable({
  providedIn: 'root'
})
export class TxDataService {

  private headers: HttpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  private baseUrl = `/API/GetTPS`;

  constructor(private http: HttpClient) { }

  public getTxPerDayCount(provider: string, interval: string) : Observable<TransactionsPerDay[]>{
    let url = `${this.baseUrl}?provider=${provider}&interval=${interval}`;
    return this.http.get(url, { headers: this.headers }) as Observable<TransactionsPerDay[]>;
  }
}
