import React, { Component } from "react";
import { HomePageModel } from "./HomePageModel";
import { Routes, Route } from 'react-router-dom';
import { pageModelAPI } from "../../services/global/apiServices";
import { HomePageResponseModel } from "../../services/api-gen/src";
import { TimeIntervals } from "../../Models/Enums";
import { Util } from "../../services/Util";
import ProviderTable from "../../Components/ProviderTable/ProviderTable";

export default class HomePage extends Component<HomePageModel, HomePageResponseModel> {
    constructor(props: HomePageModel) {
        super(props);
    }

    componentDidMount() {
        this.updateData();
    }

    updateData(){
        pageModelAPI.aPIPagesHomeGet({
            subchainsOf: '',
            interval: TimeIntervals.OneMonth,
            dataType: this.props.configuration.defaultMode,
            provider: this.props.configuration.defaultProvider,
            includeSidechains: true,
            network: this.props.configuration.defaultNetwork
        }, (err: any, data: HomePageResponseModel, res: any) => {
            if (Util.isNullOrUndefined(data)){
                this.updateData();
            }
            else{
                this.setState(data);
            }
        });
    }

    render() {
        if (Util.isNullOrUndefined(this.state))
            return <>
                Loading...
            </>;
        return <>
            <ProviderTable {...this.state}/>
        </>;
    }
}