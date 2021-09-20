import { Component } from '@angular/core';
import { ArbitrumTxDataService } from '../services/arbitrum-tx-data.service';
import { chain, transactionsPerDay, txService } from '../services/common-classes';
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

  public chains : chain[] = [] ;
  public tp = true;

  constructor(private arbitrumTxDataService: ArbitrumTxDataService, private optimismTxDataService: OptimismTxDataService) { 
    this.setChainMetaData();
    
    this.arbitrumTxDataService.getTxPerDayCount().subscribe( transactions => console.log(transactions));
    this.generateData();
  }

  public generateData() {
    let data = [];
    for (let chain of this.chains) {
      if (chain.show) data.push(this.extractDataFromService(chain.dataService.getMockTxCount(), chain.lineColor, chain.name));
    }
    this.graph.data = data as any;
  }

  private extractDataFromService (transactionCount : transactionsPerDay[], color : string, name: string) {
    let xValues = transactionCount.map(value => value.date);
    let yValues = transactionCount.map(value => value.txCount);
    return {x: xValues, y: yValues, name: name, type: 'scatter', mode: 'lines', marker: { color: color } }; 
  }

  private setChainMetaData() {
    this.chains.push ({name: 'Arbitrum', 
                       show: true, 
                       lineColor: 'red', 
                       dataService: this.arbitrumTxDataService,
                       generalInfoLink: 'https://l2beat.com/projects/arbitrum/',
                       attributionToDataSourceText: `Daily transaction data for Optimism retrieved from https://arbiscan.io`,
                       attributionToDataSourceLink: 'https://arbiscan.io/chart/tx'
                      });
    this.chains.push ({name: 'Optimism', 
                       show: true, 
                       lineColor: 'blue', 
                       dataService: this.optimismTxDataService,
                       generalInfoLink: 'https://l2beat.com/projects/optimism/',
                       attributionToDataSourceText: `Daily transaction data for Optimism retrieved from https://arbiscan.io`,
                       attributionToDataSourceLink: 'https://optimistic.etherscan.io/chart/tx'
                      });

  }

}
