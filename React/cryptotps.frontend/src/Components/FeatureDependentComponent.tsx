import React, { Component } from "react";
import { featureAPI } from "../services/global/apiServices";

export default class FeatureDependentComponent extends Component<FeatureConfiguration, FeatureDependentComponentRenderOptions>{
    constructor(props: FeatureConfiguration) {
        super(props);
    }

    componentDidMount() {
        featureAPI.apiStatusIsFeatureEnabledGet({
            featureId: -1,
            featureName: this.props.featureName,
            project: this.props.project
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

export class FeatureConfiguration{
    featureName: string;
    project: string;

    constructor(featureName: string, project: string) {
        this.featureName = featureName;
        this.project = project;
    }
}