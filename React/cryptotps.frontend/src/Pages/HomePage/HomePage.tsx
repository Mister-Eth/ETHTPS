import React, { Component } from "react";
import { HomePageModel } from "./HomePageModel";
import { Routes, Route } from 'react-router-dom';
import { pageModelAPI } from "../../services/global/apiServices";
import { HomePageResponseModel } from "../../services/api-gen/src";
import { TimeIntervals } from "../../Models/Enums";
import { isNullOrUndefined } from "util";

export default class HomePage extends Component<HomePageModel, HomePageResponseModel> {
    constructor(props: HomePageModel) {
        super(props);
    }

    componentDidMount() {
        pageModelAPI.aPIPagesHomeGet({
            subchainsOf: '',
            interval: TimeIntervals.OneMonth,
            dataType: this.props.configuration.defaultMode,
            provider: this.props.configuration.defaultProvider,
            includeSidechains: true,
            network: this.props.configuration.defaultNetwork
        }, (err: any, data: HomePageResponseModel, res: any) => {
            this.setState(data);
        });
    }

    render() {
        if (isNullOrUndefined(this.state))
            return <>
                Loading...
            </>;
        return <>
            {JSON.stringify(this.state.providers)}
        </>;
    }
}