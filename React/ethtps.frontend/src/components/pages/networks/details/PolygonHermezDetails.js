import React from "react";
import NetworkSummary from "../NetworkSummary";

export default class PolygonHermezDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            details: {
                description:
                    "Polygon Hermez is a decentralised zk-rollup focused on scaling payments and token transfers on top of Ethereum",
                purpose: 'Payments',
                links: {
                    websites: ['https://hermez.io/'],
                    repositories: ['https://github.com/hermeznetwork/'],
                    explorers: ['https://explorer.hermez.io/'],
                    socialMedia: ['https://twitter.com/0xPolygonHermez', 'https://discord.gg/polygon']
                }
            }
        }
    }

    render() {
        return <>
            <div className={'fcontainer'}>
                <div className={'fitem'} style={{ float: 'right' }}>
                    <NetworkSummary hidel2BeatReference={true} name={this.state.name} details={this.state.details.links} />
                </div>
                <div className={'fitem s-padding'}>
                    <h1>Description</h1>
                    {this.state.details.description}
                    <h1>Development goals</h1>
                    <p>
                        Everyone should have universal access to finance.
                        <br />
                        We are working on an open-source scalability model based on zero-knowledge technology (zk-rollup) to simplify and reduce costs for person-to-person payments, arbitrage opportunities and promote the adoption of digital currencies.
                        <br />
                        The decentralised Polygon Hermez protocol will provide a solid cryptographic foundation optimised for low-cost token transfers and enable future payment and financial solutions.
                        <br />
                        The development plan includes creating a private self-sovereign identity to support the DeFi ecosystem.
                    </p>
                    <h1>
                        Project qualities
                    </h1>
                    <h2>
                        Decentralised
                    </h2>
                    <p>
                        Polygon Hermez is called a network because the model is natively decentralised.
                        <br />
                        It’s a Layer 2 construction and intends to process thousands of transactions per second, so the consensus algorithm has to be simple for one agent (coordinator) to process this amount of transactions at any given time.
                        <br />
                        Our model allows the network to be permissionless and censorship resistant for user transactions.
                    </p>
                    <h2>
                        Efficient
                    </h2>
                    <p>
                        The decentralised model is implemented through a permissionless auction system for potential coordinators of the network to earn the right to process transactions during a slot of time.
                        <br />
                        The auction model incentivises the energy and cost efficiency of coordinators. They are pushed to process as many transactions as they can in order to collect the transaction fees, and to do so at the minimum operational cost in order to be able to outbid other coordinators (and make money out of it).
                        <br />
                        Polygon Hermez implements a zk-rollup based on zk-SNARKs proofs, the most efficient cryptographic construction in terms of batch cost in Ethereum.
                    </p>
                    <h2>
                        Security in mind
                    </h2>
                    <p>
                        Polygon Hermez is a layer 2 construction that leverages Ethereum not only by using its native tokens, but also by borrowing its security as a strong public blockchain. Every Polygon Hermez Network batch can be securely reconstructed from the proof and data posted in the Ethereum Blockchain.
                        <br />
                        Polygon Hermez’ implementation is based in iden3’s own technology (Circom and SnarkJS libraries) and the cryptographic technology which has been proven as the most robust so far, as used in the ZCash blockchain.
                    </p>
                    <h2>
                        Part of the community
                    </h2>
                    <p>
                        Polygon Hermez is designed to contribute to the community, since the project wouldn’t be possible without it. Innovations in scalability are a rare opportunity to realign incentives around the community and the public goods they provide.
                        <br />
                        Our Proof-of-Donation consensus algorithm will send 40% of the network’s generated value as a donation to the projects behind the ecosystem’s public goods.
                        <br />
                        Polygon Hermez will open source all the code of the protocol and the coordinator, is open to contributions, and has committed to contribute to the creation of a L2 ecosystem for initiatives such as better L2 interoperability.
                    </p>
                </div>
            </div>
        </>
    }
}