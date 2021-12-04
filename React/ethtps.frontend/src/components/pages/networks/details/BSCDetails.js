import React from "react";
import NetworkSummary from "../NetworkSummary";

export default class BSCDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: props.name,
            details: {
                description:
                  '',
                purpose: 'Universal',
                links: {
                    
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
                    {this.state.details.description}
                </div>
           </div>
        </>
    }
}