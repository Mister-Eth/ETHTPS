import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { TransactionsPerDay, Providers } from './common-classes';

@Injectable({
  providedIn: 'root'
})
export class TxDataService {

  private headers: HttpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  private baseUrl = `/API/GetTPS`;

  constructor(private http: HttpClient) { }

  public getTxPerDayCount(provider: string, interval: string): Observable<TransactionsPerDay[]> {
    let url = `${this.baseUrl}?provider=${provider}&interval=${interval}`;
    return this.http.get(url, { headers: this.headers }) as Observable<TransactionsPerDay[]>;
  }

  public getTransactionsForInterval(interval: string, providers: Providers[]): Observable<{ [key: string]: TransactionsPerDay[] }> {
    //map to multiple get requests 
    let requestsArray = providers.map(provider => this.providerToRequest(provider.name, interval));
    // convert array to object to feed the forkJoin
    let requestsObject: { [chainName: string]: Observable<TransactionsPerDay[]> } = requestsArray.reduce((a, v) => ({ ...a, [v.provider]: v.request }), {})
    //combine all requests to one observable
    let combined: Observable<{ [chainName: string]: TransactionsPerDay[] }> = forkJoin(requestsObject);
    
    return combined;
  }

  private providerToRequest(provider: string, interval: string): { provider: string, request: Observable<TransactionsPerDay[]> } {
    return ({
      provider: provider,
      request: this.getTxPerDayCount(provider, interval)
    });
  }
}
