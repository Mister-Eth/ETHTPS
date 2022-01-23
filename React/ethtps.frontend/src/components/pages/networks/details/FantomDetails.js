import React from "react";

export default class FantomDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            description: "No data is available right now",
            upgradePlans: ""
        }
    }
    
    render(){
        return <>
            <h1>Description</h1>
            {this.state.description}
            <h1>Upgrade plans</h1>
            {this.state.upgradePlans}
        </>
    }
}