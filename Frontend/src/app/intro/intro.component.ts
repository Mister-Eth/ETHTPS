import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatChip, MatChipList } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { ArbitrumTxDataService } from '../services/arbitrum-tx-data.service';
import { chain, transactionsPerDay, txService } from '../services/common-classes';
import { EthereumTxDataService } from '../services/ethereum-tx-data.service';
import { OptimismTxDataService } from '../services/optimism-tx-data.service';

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
  public selectedInterval = "OneDay";
  @ViewChild(MatChipList)
  chipList!: MatChipList;

  public chains: chain[] = [];


  constructor(private arbitrumTxDataService: ArbitrumTxDataService,
    private optimismTxDataService: OptimismTxDataService,
    private ethereumTxDataService: EthereumTxDataService,
    private http: HttpClient) {

    this.setChainMetaData();
    this.intervals$ = this.http.get<string[]>(this.intervalsUrl, { headers: this.headers });



    this.ethereumTxDataService.getTxPerDayCount().subscribe(transactions => console.log(transactions));
    this.generateData();
  }

  public toggleIntervalSelection(chip: MatChip) {
    chip.toggleSelected();
    this.selectedInterval = (this.chipList.selected as MatChip).value;
    console.log("Selected interval: " + this.selectedInterval);
  }

  ngAfterViewInit() {
    this.intervals$.subscribe(intervals => {
      this.selectedInterval = intervals[0];
      for (let chip of this.chipList.chips) {
        if (chip.value == this.selectedInterval) chip.toggleSelected();
      }
    });

  }

  public generateData() {
    let data = [];
    for (let chain of this.chains) {
      if (chain.show) data.push(this.extractDataFromService(chain.dataService.getMockTxCount(), chain.lineColor, chain.name));
    }
    this.graph.data = data as any;
  }

  private extractDataFromService(transactionCount: transactionsPerDay[], color: string, name: string) {
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
