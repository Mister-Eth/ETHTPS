import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatChip, MatChipList } from '@angular/material/chips';

import { forkJoin, Observable, zip } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Chain, Providers, TransactionsPerDay, txService } from '../services/common-classes';
import { TxDataService } from '../services/tx-data.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent {
  public graph = {
    data: [],
    layout: { title: 'TPS' }
  };

  private headers: HttpHeaders = new HttpHeaders()
    .set('Content-Type', 'text/plain')
    .set('Access-Control-Allow-Origin', '*');

  private intervalsUrl = `/API/intervals`;
  public intervals$: Observable<string[]>;
  public intervals: string[] = [];
  public selectedInterval = "";
  @ViewChild(MatChipList)
  chipList!: MatChipList;

  private providersUrl = `/API/Providers`;
  private providers$: Observable<Providers[]>;
  private providers: Providers[] = [];

  public chains: Chain[] = [];
  private acquiredData: { [key: string]: TransactionsPerDay[] } = {};

  public columnsToDisplay = ['select', 'name'];
  public selection : SelectionModel<Chain>;

  public isTxDataAcquired = false;


  constructor(
    private txDataService: TxDataService,
    private http: HttpClient) {

    this.setChainMetaData();
    this.selection = new SelectionModel<Chain>(true, this.chains); // initially select all chains

    this.intervals$ = this.http.get<string[]>(this.intervalsUrl, { headers: this.headers });
    this.intervals$.subscribe(intervals => this.intervals = intervals);

    this.providers$ = this.http.get<Providers[]>(this.providersUrl, { headers: this.headers });
    this.providers$.subscribe(providers => this.providers = providers);

    this.getInitialTxData(this.providers$, this.intervals$)

    this.selection.changed.subscribe(_ => this.extractData());
  }


  private getInitialTxData(providers$: Observable<Providers[]>, intervals$: Observable<string[]>): void {
    // combine both requests so we can wait for them together
    let together = forkJoin({
      providers: providers$,
      intervals: intervals$
    });

    // map the providers and intervals to requests for transaction count
    let mappedToTxRequests = together.pipe(mergeMap(({ providers, intervals }) => {
      let interval = intervals[intervals.length - 1];
      return this.txDataService.getTransactionsForInterval(interval, providers);
    }));

    mappedToTxRequests.subscribe(data => {
      this.acquiredData = data;
      this.extractData();
      this.isTxDataAcquired = true;
    })
  }

  public toggleIntervalSelection(chip: MatChip): void {
    this.isTxDataAcquired = false;
    chip.toggleSelected();
    this.selectedInterval = (this.chipList.selected as MatChip).value;
    let tp$ = this.txDataService.getTransactionsForInterval(this.selectedInterval, this.providers);
    tp$.subscribe(data => {
      this.acquiredData = data;
      this.extractData();
      this.isTxDataAcquired = true;
    });
  }

  ngAfterViewInit() {
    this.intervals$.subscribe(intervals => this.setInitialIntervalOnChips(intervals));
  }

  private setInitialIntervalOnChips(availableIntervals: string[]): void {
    this.selectedInterval = availableIntervals[availableIntervals.length - 1];
    for (let chip of this.chipList.chips) {
      if (chip.value == this.selectedInterval) chip.toggleSelected();
    }
  }

  public extractData() {
    let data = [];
    for (let chain of this.chains) {
      if (this.selection.isSelected(chain)) data.push(this.extractDataFromService(this.acquiredData[chain.name], chain.lineColor, chain.name));
    }
    this.graph.data = data as any;
  }

  private extractDataFromService(transactionCount: TransactionsPerDay[], color: string, name: string) {
    let xValues = transactionCount.map(value => value.date);
    let yValues = transactionCount.map(value => value.tps);
    return { x: xValues, y: yValues, name: name, type: 'scatter', mode: 'lines', marker: { color: color } };
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.chains);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.chains.length;
    return numSelected === numRows;
  }

  /** The label for the checkbox on the passed row */
  public checkboxLabel(row?: Chain): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name}`;
  }

  private setChainMetaData() {
    this.chains.push({
      name: 'Arbitrum One',
      show: true,
      lineColor: 'red',
      generalInfoLink: 'https://l2beat.com/projects/arbitrum/',
      attributionToDataSourceText: `Daily transaction data for Optimism retrieved from https://arbiscan.io`,
      attributionToDataSourceLink: 'https://arbiscan.io/chart/tx'
    });
    this.chains.push({
      name: 'Optimism',
      show: true,
      lineColor: 'blue',
      generalInfoLink: 'https://l2beat.com/projects/optimism/',
      attributionToDataSourceText: `Daily transaction data for Optimism retrieved from https://arbiscan.io`,
      attributionToDataSourceLink: 'https://optimistic.etherscan.io/chart/tx'
    });
    this.chains.push({
      name: 'Ethereum',
      show: true,
      lineColor: 'green',
      generalInfoLink: '',
      attributionToDataSourceText: ``,
      attributionToDataSourceLink: ''
    });
    this.chains.push({
      name: 'Polygon',
      show: true,
      lineColor: 'orange',
      generalInfoLink: '',
      attributionToDataSourceText: ``,
      attributionToDataSourceLink: ''
    });
  }

}
