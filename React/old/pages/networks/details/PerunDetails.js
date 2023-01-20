import React from "react";
import NetworkSummary from "../NetworkSummary";

export default class PerunDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: props.name,
            details: {
                description:
                  "Perun is an off-chain framework that supports real-time payments as well as complex business logic and supercharges any existing blockchain",
                purpose: 'Payments',
                links: {
                  websites: ['https://perun.network/'],
                  repositories: ['https://github.com/hyperledger-labs/perun-eth-contracts']
                }
            }
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
                </div>
           </div>
        </>
    }
}