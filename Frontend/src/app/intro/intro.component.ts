import { Component } from '@angular/core';
import { ArbitrumTxDataService } from '../services/arbitrum-tx-data.service';
import { transactionsPerDay, txService } from '../services/common-classes';
import { OptimismTxDataService } from '../services/optimism-tx-data.service';

export interface chain {
  name:string;
  show: boolean;
  lineColor: string;
  dataService: txService;
}

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

  public chains : chain[] = [] ;
  public tp = true;

  constructor(private arbitrumTxDataService: ArbitrumTxDataService, private optimismTxDataService: OptimismTxDataService) { 
    this.chains.push ({name: 'Arbitrum', show: true, lineColor: 'red', dataService: arbitrumTxDataService});
    this.chains.push ({name: 'Optimism', show: true, lineColor: 'blue', dataService: optimismTxDataService});
    
    //this.arbitrumTxDataService.getTxPerDayCount().subscribe( transactions => console.log(transactions));
    this.generateData();
  }

  private extractDataFromService (transactionCount : transactionsPerDay[], color : string, name: string) {
    let xValues = transactionCount.map(value => value.date);
    let yValues = transactionCount.map(value => value.txCount);
    return {x: xValues, y: yValues, name: name, type: 'scatter', mode: 'lines', marker: { color: color } }; 
  }

  public generateData() {
    let data = [];
    for (let chain of this.chains) {
      if (chain.show) data.push(this.extractDataFromService(chain.dataService.getMockTxCount(), chain.lineColor, chain.name));
    }
    this.graph.data = data as any;
  }
}
