import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatChip, MatChipList } from '@angular/material/chips';

import { forkJoin, Observable, zip } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ArbitrumTxDataService } from '../services/arbitrum-tx-data.service';
import { Chain, Providers, TransactionsPerDay, txService } from '../services/common-classes';
import { EthereumTxDataService } from '../services/ethereum-tx-data.service';
import { OptimismTxDataService } from '../services/optimism-tx-data.service';
import { TxDataService } from '../services/tx-data.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent {
  public graph = {
    data: [],
    layout: { title: 'Transactions per day' }
  };

  private headers: HttpHeaders = new HttpHeaders()
    .set('Content-Type', 'text/plain')
    .set('Access-Control-Allow-Origin', '*');

  private intervalsUrl = `/API/intervals`;
  public intervals$: Observable<string[]>;
  public selectedInterval = "";
  @ViewChild(MatChipList)
  chipList!: MatChipList;

  private providersUrl = `/API/Providers`;
  private providers$: Observable<Providers[]>;

  public chains: Chain[] = [];
  private aquiredData: {[key: string]: TransactionsPerDay[]} = {};


  constructor(private arbitrumTxDataService: ArbitrumTxDataService,
    private optimismTxDataService: OptimismTxDataService,
    private ethereumTxDataService: EthereumTxDataService,
    private txDataService: TxDataService,
    private http: HttpClient) {

    this.setChainMetaData();
    this.intervals$ = this.http.get<string[]>(this.intervalsUrl, { headers: this.headers });
    this.providers$ = this.http.get<Providers[]>(this.providersUrl, { headers: this.headers });
    this.getTpsRequests(this.providers$, this.intervals$)
      .subscribe( data => {
        this.aquiredData = data;
        this.extractData();
      })

    
  }

  private getTpsRequests(providers$: Observable<Providers[]>, intervals$: Observable<string[]>) 
    : Observable<{[key: string]: TransactionsPerDay[]}> {
    // combine both requests so we can wait for them together
    let together = forkJoin({
      providers: providers$,
      intervals: intervals$
    });

    // map the providers and intervals to requests for transaction count
    // flatten them to get one observable, instead of nested observables
    let mappedToTxRequests = together.pipe(mergeMap( ({providers,intervals}) => {
      //map to multiple get requests 
      let requestsArray = providers.map(provider => this.providerToRequest(provider.name, intervals[0]));
      // convert array to object to feed the forkJoin
      let requestsObject : {[chainName: string]: Observable<TransactionsPerDay[]>} = requestsArray.reduce((a, v) => ({ ...a, [v.provider]: v.request}), {})
      //combine all requests to one observable
      let combined : Observable<{[chainName: string]: TransactionsPerDay[]}> =  forkJoin (requestsObject);
      return combined;
    }));

    return mappedToTxRequests;
  }

  private providerToRequest (provider: string, interval: string) : {provider: string, request: Observable<TransactionsPerDay[]>} {
    return ({
      provider: provider,
      request: this.txDataService.getTxPerDayCount(provider, interval)});
  }

  public toggleIntervalSelection(chip: MatChip) {
    chip.toggleSelected();
    this.selectedInterval = (this.chipList.selected as MatChip).value;
  }

  ngAfterViewInit() {
    this.intervals$.subscribe(intervals => this.setInitialIntervalOnChips(intervals));
  }

  private setInitialIntervalOnChips(availableIntervals: string[]): void {
    this.selectedInterval = availableIntervals[0];
    for (let chip of this.chipList.chips) {
      if (chip.value == this.selectedInterval) chip.toggleSelected();
    }
  }

  public extractData() {
    let data = [];
    for (let chain of this.chains) {
      if (chain.show) data.push(this.extractDataFromService(this.aquiredData[chain.name], chain.lineColor, chain.name));
    }
    this.graph.data = data as any;
  }

  private extractDataFromService(transactionCount: TransactionsPerDay[], color: string, name: string) {
    let xValues = transactionCount.map(value => value.date);
    let yValues = transactionCount.map(value => value.tps);
    return { x: xValues, y: yValues, name: name, type: 'scatter', mode: 'lines', marker: { color: color } };
  }

  private setChainMetaData() {
    this.chains.push({
      name: 'Arbitrum One',
      show: true,
      lineColor: 'red',
      dataService: this.arbitrumTxDataService,
      generalInfoLink: 'https://l2beat.com/projects/arbitrum/',
      attributionToDataSourceText: `Daily transaction data for Optimism retrieved from https://arbiscan.io`,
      attributionToDataSourceLink: 'https://arbiscan.io/chart/tx'
    });
    this.chains.push({
      name: 'Optimism',
      show: true,
      lineColor: 'blue',
      dataService: this.optimismTxDataService,
      generalInfoLink: 'https://l2beat.com/projects/optimism/',
      attributionToDataSourceText: `Daily transaction data for Optimism retrieved from https://arbiscan.io`,
      attributionToDataSourceLink: 'https://optimistic.etherscan.io/chart/tx'
    });
    this.chains.push({
      name: 'Ethereum',
      show: true,
      lineColor: 'green',
      dataService: this.ethereumTxDataService,
      generalInfoLink: '',
      attributionToDataSourceText: ``,
      attributionToDataSourceLink: ''
    });

  }

}
