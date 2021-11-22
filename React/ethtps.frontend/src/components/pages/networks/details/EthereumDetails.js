import React from "react";
import NetworkSummary from "../NetworkSummary";
import triangle from '../../../../assets/dcs-triangle.png';

export default class EthereumDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            details: {
                description:
                  'Ethereum is a decentralized blockchain network powered by the Ether token that enables users to make transactions, earn interest on their holdings through staking, use and store nonfungible tokens (NFTs), trade cryptocurrencies, play games, use social media and so much more.',
                purpose: 'Universal',
                links: {
                  websites: ['https://ethereum.org/en/'],
                  documentation: ['https://ethereum.org/en/developers/docs/'],
                  explorers: ['https://etherscan.io/', 'https://ethplorer.io/'],
                  repositories: [
                    'https://github.com/ethereum',
                  ]
                }
            },
            name: props.name
        }
    }
    
    render(){
        return <>
           <div className={'fcontainer'}>
                <div className={'fitem'} style={{float:'right'}}>
                    <NetworkSummary name={this.state.name} details={this.state.details.links} hidel2BeatReference={true}/>
                </div>
                <div className={'fitem s-padding'}>
                    <h1>Description</h1>
                    {this.state.details.description}
                    <h1>
                    How does Ethereum work?
                </h1>
                <p>
                Like Bitcoin, the Ethereum network exists on thousands of computers worldwide, thanks to users participating as “nodes,” rather than a centralized server. This makes the network decentralized and highly immune to attacks, and essentially unable to go down as a result. If one computer goes down, it doesn’t matter because thousands of others are holding the network up.
                <br/><br/>
                Ethereum is essentially a single, decentralized system that runs a computer called the Ethereum Virtual Machine (EVM). Each node holds a copy of that computer, meaning that any interactions must be verified so everyone can update their copy.
                <br/><br/>
                Network interactions are otherwise considered “transactions” and are stored within blocks on the Ethereum blockchain. Miners validate these blocks before committing them to the network and acting as transaction history or a digital ledger. Mining to verify transactions is known as a proof-of-work consensus method. Each block has a unique 64-digit code identifying it. Miners commit their computer power to find that code, proving that it’s unique. Their computer power is “proof” of that work, and miners are rewarded in ETH for their efforts.
                <br/><br/>
                Also like Bitcoin, all Ethereum transactions are entirely public. Miners broadcast completed blocks to the rest of the network, confirming the change and adding the blocks to everyone’s copy of the ledger. Confirmed blocks cannot be tampered with, serving as a perfect history of all network transactions.
                <br/><br/>
                But if miners are paid for their work, where does that ETH come from? Each transaction comes with a fee, called “gas,” which is paid by the user initiating said transaction. That fee is paid to the miner who validates the transaction, incentivizing future mining and ensuring network security. Gas essentially serves as a limit, restricting the number of actions a user can make per transaction. It’s also in place to prevent network spam.
                <br/><br/>
                Because ETH is more of a utility token than a token of value, its supply is infinite. Ether consistently enters circulation in the form of miner rewards, and it will with staking rewards as well once the network moves to PoS. In theory, Ether will always be in demand, meaning inflation should never devalue the asset beyond use.
                <br/><br/>
                Unfortunately for many, Ethereum gas fees can run quite high based on network activity. This is because a block can only hold so much gas, which varies based on transaction types and amounts. As a result, miners will choose transactions with the highest gas fees, meaning users are competing to validate transactions first. This competition pushes fees higher and higher, congesting the network during busy times.
                <br/><br/>
                Network congestion is a significant problem, though it’s being addressed in Ethereum 2.0 — a complete overhaul that will be discussed as a separate section.
                <br/><br/>
                Interacting with Ethereum requires cryptocurrency, which is stored in a wallet. That wallet connects to DApps, acting as a passport for the Ethereum ecosystem. From there, anyone can purchase items, play games, lend money and do all sorts of activities just as they do on the traditional internet. Only, the traditional web is free to users, as they’re giving away personal information. Centralized entities running websites then sell that data to make money.
                <br/><br/>
                Cryptocurrency takes the place of data here, meaning users are free to browse and interact anonymously. This also means DApp use is nondiscriminatory. For example, no lending or banking DApp can reject someone based on their race or financial status. An intermediary can’t block what they consider a “suspicious transaction.” Users control what they do and how they do it, which is why many consider Ethereum to be Web 3.0 — the future of web interaction.
                                
                </p>
                <a href="https://cointelegraph.com/ethereum-for-beginners/what-is-ethereum-a-beginners-guide-to-eth-cryptocurrency">Source</a>
                
                <h1>Ethereum 2.0</h1>
                <p>
                Ethereum 2.0, also known as Eth2 or “Serenity,” is an upgrade to the Ethereum blockchain. The upgrade aims to enhance the speed, efficiency, and scalability of the Ethereum network so that it can process more transactions and ease bottlenecks.
                </p>
                <p>
                While Ethereum 1.0 uses a consensus mechanism known as proof-of-work (PoW), Ethereum 2.0 will use a proof-of-stake (PoS) mechanism.
                </p>
                <h1>
                How does proof of stake differ from proof of work?
                </h1>
                <p>
                With blockchains such as Ethereum, there is a need to validate transactions in a decentralized way. Ethereum, like other cryptocurrencies such as Bitcoin, currently uses a proof of work consensus mechanism.
                <br/><br/>
                In this system, miners use a machine’s processing power to solve complex mathematical puzzles and verify new transactions. The first miner to solve a puzzle adds a new transaction to the record of all transactions that make up the blockchain. They are then rewarded with the network’s native cryptocurrency. However, this process can be hugely energy-intensive.
                roof of stake differs in that instead of miners, users can stake a network’s native cryptocurrency and become validators. Validators are similar to miners in that they verify transactions and ensure the network isn’t processing fraudulent transactions.
                <br/><br/>
                These validators are selected to propose a block based on how much crypto they have staked, and how long they’ve staked it for.
                <br/><br/>
                Other validators can then attest that they have seen a block. When there are enough attestations, a block can be added to the blockchain. Validators are then rewarded for the successful block proposition. This process is known as “forging” or “minting.”
                <br/><br/>
                The main advantage of PoS is that it is far more energy-efficient than PoW, as it decouples energy-intensive computer processing from the consensus algorithm. It also means that you don’t need a lot of computing power to secure the blockchain.
                <br/><br/>
                <a href="https://decrypt.co/resources/what-is-ethereum-2-0">Source</a>
                </p>
                <h1>
                The Scalability Trilemma
                </h1>
                <img width={400} src={triangle}/>
                <p>
                The Scalability Trilemma claims that blockchain systems can only, at most, have two of the following three properties:
                </p>
                <ul>
                    <li key={'d'}>
                    Decentralization (defined as the system being able to run in a scenario where each participant only has access to O(c) resources, i.e. a regular laptop or small VPS)
                    </li>
                    <li key={'s'}>
                    Scalability (defined as being able to process many transactions)
                    </li>
                    <li key={'se'}>
                    Security (defined as being secure against attackers with up to O(n) resources)
                    </li>
                </ul>
                <p>
                The key challenge of scalability is finding a way to achieve all three at the base layer of a blockchain - sharding is one such attempt at solving this challenge.
                </p>
                <h1>
                What is sharding?
                </h1>
                <p>
                Currently, in all blockchain protocols, each node stores the entire state (account balances, contract code and storage, etc.) and processes all transactions. This provides a large amount of security, but greatly limits scalability: a blockchain cannot process more transactions than a single node can. In large part, because of this, Bitcoin is limited to ~3-7 transactions per second, Ethereum to 7-15, etc.
                <br/><br/>
                However, this poses a question: are there ways to create a new mechanism, where only a small subset of nodes verifies each transaction? As long as there are sufficiently many nodes verifying each transaction, then the system is still highly secure. But a sufficiently small percentage of the total validator set that the system can process many transactions in parallel, could we not split up transaction processing between smaller groups of nodes to greatly increase a blockchain's total throughput?
                </p>
                <h1>
                What is the basic idea behind sharding?
                </h1>
                <p>
                We split the state and history of Ethereum up into partitions that we call “shards”. For example, a sharding scheme on Ethereum might put all addresses starting with 0x00 into one shard, all addresses starting with 0x01 into another shard, etc. In the simplest form of sharding, each shard also has its own transaction history, and the effect of transactions in some shard are limited to the state of shard of that same shard. One simple example would be a multi-asset blockchain, where there are many shards and where each shard stores the balances and processes the transactions associated with one particular asset. In more advanced forms of sharding, there exists some form of cross-shard communication capability, where transactions on one shard can trigger events on other shards.
                </p>
                <h1>
                What might a basic design of a sharded blockchain look like?
                </h1>
                <p>
                There exists a set of validators (ie. proof of stake nodes), who randomly get assigned the right to create shard blocks. During each slot (eg. an 8-second period of time), for each shard in [0...999] a random validator gets selected, and given the right to create a block on a shard, which might contain up to, say, 32 kb of data. Also, for each shard, a set of 100 validators get selected as attestors. The header of a block, together with at least 67 of the attesting signatures, can be published as an object that gets included in the "main chain" (also called the beacon chain).
                <br/><br/>
                Note that there are now several "levels" of nodes that can exist in such a system:
                </p>
                <ul>
                    <li>
                    Super-full node - downloads the full data of the beacon chain and every shard block referenced in the beacon chain.
                    </li>
                    <li>
                    Top-level node - processes the beacon chain blocks only, including the headers and signatures of the shard blocks, but does not download all the data of the shard blocks.
                    </li>
                    <li>
                    Single-shard node - acts as a top-level node, but also fully downloads and verifies every collation on some specific shard that it cares more about.
                    </li>
                    <li>
                    Light node - downloads and verifies the block headers of main chain blocks only; does not process any collation headers or transactions unless it needs to read some specific entry in the state of some specific shard, in which case it downloads the Merkle branch to the most recent collation header for that shard and from there downloads the Merkle proof of the desired value in the state.
                    </li>
                </ul>
                <a href={'https://docs.ethhub.io/ethereum-roadmap/ethereum-2.0/sharding/'}>Source</a>
                </div>
           </div>
        </>;
    }
}