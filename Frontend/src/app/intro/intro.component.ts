import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatChip, MatChipList } from '@angular/material/chips';

import { Observable, zip } from 'rxjs';
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


  constructor(private arbitrumTxDataService: ArbitrumTxDataService,
    private optimismTxDataService: OptimismTxDataService,
    private ethereumTxDataService: EthereumTxDataService,
    private txDataService: TxDataService,
    private http: HttpClient) {

    this.setChainMetaData();
    this.intervals$ = this.http.get<string[]>(this.intervalsUrl, { headers: this.headers });
    this.providers$ = this.http.get<Providers[]>(this.providersUrl, { headers: this.headers });
    let tpsObservables = this.getTpsRequests(this.providers$, this.intervals$);
    tpsObservables.subscribe(observables => {
       for (let observable of observables) {
         observable.subscribe( transactions => {
           console.log(transactions.length);
           
         });
       }
    });

    //this.ethereumTxDataService.getTxPerDayCount().subscribe(transactions => console.table(transactions));
    this.generateData();
  }

  private getTpsRequests(providers$: Observable<Providers[]>, intervals$: Observable<string[]>) : Observable<Observable<TransactionsPerDay[]>[]>{
    //merge two first values of two observables
    let zippedOs = zip(intervals$, providers$).pipe(map(x => x[1].map(provider => {
      return ({provider: provider.name, interval: x[0][0]})
    })));

    //map them to get calls' observables
    let mappedOs = zippedOs.pipe(map(array => array.map(element => this.txDataService.getTxPerDayCount(element.provider, element.interval))));

    //todo: merge them
    
    return mappedOs;
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

  public generateData() {
    let data = [];
    for (let chain of this.chains) {
      if (chain.show) data.push(this.extractDataFromService(chain.dataService.getMockTxCount(), chain.lineColor, chain.name));
    }
    this.graph.data = data as any;
  }

  private extractDataFromService(transactionCount: TransactionsPerDay[], color: string, name: string) {
    let xValues = transactionCount.map(value => value.date);
    let yValues = transactionCount.map(value => value.txCount);
    return { x: xValues, y: yValues, name: name, type: 'scatter', mode: 'lines', marker: { color: color } };
  }

  private setChainMetaData() {
    this.chains.push({
      name: 'Arbitrum',
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

  }

}
