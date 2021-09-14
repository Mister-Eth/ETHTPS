import { Component } from '@angular/core';
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

  //private arbitrumTxCount : transactionsPerDay[] = [];

  constructor(private arbitrumTxDataService: ArbitrumTxDataService, private optimismTxDataService: OptimismTxDataService) { 
    //this.arbitrumTxDataService.getTxPerDayCount().subscribe( transactions => console.log(transactions));
    this.graph.data=[this.extractDataFromService(this.arbitrumTxDataService.getMockTxCount(), 'red', 'Arbitrum'),
                     this.extractDataFromService(this.optimismTxDataService.getMockTxCount(), 'blue', 'Optimism')];
  }

  private extractDataFromService (transactionCount : transactionsPerDay[], color : string, name: string) {
    let xValues = transactionCount.map(value => value.date);
    let yValues = transactionCount.map(value => value.txCount);
    return {x: xValues as number, y: yValues, name: name, type: 'scatter', mode: 'lines', marker: { color: color } };
    
  }
}
