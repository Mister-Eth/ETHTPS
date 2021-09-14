export interface txService {
    getMockTxCount(): transactionsPerDay[];
}

export interface transactionsPerDay {
    date: Date;
    unixTime: number;
    txCount: number;
}