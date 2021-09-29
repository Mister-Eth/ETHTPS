import { Chain } from './common-classes';

export const chains: Chain[] = [
    {
        name: 'Arbitrum One',
        show: true,
        lineColor: 'red',
        generalInfoLink: 'https://l2beat.com/projects/arbitrum/',
        attributionToDataSourceText: `Daily transaction data for Optimism retrieved from https://arbiscan.io`,
        attributionToDataSourceLink: 'https://arbiscan.io/chart/tx'
    },
    {
        name: 'Optimism',
        show: true,
        lineColor: 'blue',
        generalInfoLink: 'https://l2beat.com/projects/optimism/',
        attributionToDataSourceText: `Daily transaction data for Optimism retrieved from https://arbiscan.io`,
        attributionToDataSourceLink: 'https://optimistic.etherscan.io/chart/tx'
    },
    {
        name: 'Ethereum',
        show: true,
        lineColor: 'green',
        generalInfoLink: '',
        attributionToDataSourceText: ``,
        attributionToDataSourceLink: ''
    },
    {
        name: 'Polygon',
        show: true,
        lineColor: 'orange',
        generalInfoLink: '',
        attributionToDataSourceText: ``,
        attributionToDataSourceLink: ''
    }
]

