import React, { Component } from "react";
import { featureAPI } from "../services/global/apiServices";

export default class FeatureDependentComponent<TP> extends Component<TP, FeatureDependentComponentRenderOptions>{
    featureName: string;
    project: string;

    constructor(props: TP, featureName: string, project: string) {
        super(props);
        this.featureName = featureName;
        this.project = project;
    }

    componentDidMount() {
        featureAPI.apiStatusIsFeatureEnabledGet({
            featureId: -1,
            featureName: 'DiscordBanner',
            project: 'ETHTPS'
        }, (err: any, data: string, res: any) => {
            let x = JSON.parse(res.body) as Boolean;
            this.setState({shouldRender: x});
        });
    }

    shouldRender(): Boolean {
        let result: Boolean = false;
        if (this.state !== null) {
            result = this.state.shouldRender;
        }
        return result;
    }
}

export class FeatureDependentComponentRenderOptions {
    shouldRender: Boolean;
    constructor(shouldRender: Boolean) {
        this.shouldRender = shouldRender;
    }
}