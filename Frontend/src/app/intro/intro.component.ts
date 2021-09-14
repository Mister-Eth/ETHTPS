import { Component, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { ArbitrumTxDataService, transactionsPerDay } from '../services/arbitrum-tx-data.service';
import { OptimismTxDataService } from '../services/optimism-tx-data.service';



@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent {
  public graph = {
    data: [],
    layout: {  title: 'Transactions per day' }
  };



  public chains =  new Map<string, boolean>() ;

  constructor(private arbitrumTxDataService: ArbitrumTxDataService, private optimismTxDataService: OptimismTxDataService) { 
    this.chains.set('Arbitrum', true);
    this.chains.set('Optimism', true);

    //this.arbitrumTxDataService.getTxPerDayCount().subscribe( transactions => console.log(transactions));
    this.generateData();
  }

  private extractDataFromService (transactionCount : transactionsPerDay[], color : string, name: string) {
    let xValues = transactionCount.map(value => value.date);
    let yValues = transactionCount.map(value => value.txCount);
    return {x: xValues, y: yValues, name: name, type: 'scatter', mode: 'lines', marker: { color: color } }; 
  }

  private generateData() {
    let data = [];
    if (this.chains.get('Arbitrum')) data.push(this.extractDataFromService(this.arbitrumTxDataService.getMockTxCount(), 'red', 'Arbitrum'));
    if (this.chains.get('Optimism')) data.push(this.extractDataFromService(this.optimismTxDataService.getMockTxCount(), 'blue', 'Optimism'));
    this.graph.data = data;
  }
}
