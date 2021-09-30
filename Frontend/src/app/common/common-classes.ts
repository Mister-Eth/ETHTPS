export interface txService {
    getMockTxCount(): TransactionsPerDay[];
}

export interface TransactionsPerDay {
    date: Date;
    unixTime: number;
    txCount?: number;
    tps?: number;
}

export interface Chain {
    name: string;
    show: boolean;
    lineColor: string;
    generalInfoLink: string;
    attributionToDataSourceText: string;
    attributionToDataSourceLink: string;
    logo?: string;
}

export interface Providers {
    id: number;
    name: string;
    type: number;
}