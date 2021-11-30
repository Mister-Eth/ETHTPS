import React from "react";
import NetworkSummary from "../NetworkSummary";

export default class RoninDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            details: {
                description:
                  'Ronin is an Ethereum-linked sidechain made specifically for Axie Infinity.',
                purpose: 'Universal',
                links: {
                  explorers: ['https://explorer.roninchain.com/'],
                  repositories: [
                    'https://github.com/axieinfinity',
                  ],
                  bridges: [
                    "https://bridge.roninchain.com/"
                  ],
                  socialMedia: [
                    'https://twitter.com/axieinfinity',
                    'https://twitter.com/SkyMavisHQ',
                    'https://medium.com/axie-infinity/'
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
                    <NetworkSummary hidel2BeatReference={true} name={this.state.name} details={this.state.details.links}/>
                </div>
                <div className={'fitem s-padding'}>
                    <h1>Description</h1>
                    {this.state.details.description}
                    
               <h1>Scaling Axie With Ronin</h1>
               <p>
               In order for Axie Infinity to reach our second, third, and fourth-degree connections (the friends and family of our friends and family) Axie needs a long term solution that makes participating in the Axie game & economy, fast, cheap, and seamless. We need it to be fun and easy!
                </p>
                <p>
                Ronin comes with:
                </p>
                <ul>
                  <li>
                  Fast & seamless transactions with almost instant confirmation.
                  </li>
                  <li>
                  Drastically reduced gas fees. In addition, rather than paying Ethereum miners — the gas fees could be retained by the community and used for things like tournaments & bounties.
                  </li>
                  <li>
                  The ability to withdraw Axie assets back to Ethereum Mainnet.
                  </li>
                  <li>
                  Simplified on-boarding for new users, through a customized wallet solution.
                  </li>
                  <li>
                  A block explorer for transparency and data accessibility.
                  </li>
                </ul>
                <a href={'https://medium.com/axie-infinity/introducing-ronin-axie-infinitys-ethereum-sidechain-8745e31eaef1'}>Source</a>
                </div>
           </div>
        </>;
    }
}