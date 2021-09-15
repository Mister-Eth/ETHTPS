export interface txService {
    getMockTxCount(): transactionsPerDay[];
}

export interface transactionsPerDay {
    date: Date;
    unixTime: number;
    txCount: number;
}

export interface chain {
    name: string;
    show: boolean;
    lineColor: string;
    dataService: txService;
    generalInfoLink: string;
    attributionToDataSourceText: string;
    attributionToDataSourceLink: string;
}