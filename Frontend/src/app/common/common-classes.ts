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
    type: ChainType;
    lineColor: string;
    generalInfoLink: string;
    attributionToDataSourceText: string;
    attributionToDataSourceLink: string;
    logo?: string;
}

export enum ChainType {
    Mainnet = "Mainnet",
    OptimisticRollup = "Optimistic rollup",
    ZKRollup = "ZK rollup",
    Sidechain = "Sidechain",
    ApplicationSpecificRollup = "Application-specific rollup"
}

export interface Providers {
    id: number;
    name: string;
    type: number;
}