import React, { Component } from "react";
import { featureAPI } from "../services/global/apiServices";

export default class FeatureDependentComponent<TProps> extends Component<FeatureConfiguration<TProps>, FeatureDependentComponentRenderOptions>{
    constructor(props: FeatureConfiguration<TProps>) {
        super(props);
    }

    componentDidMount() {
        featureAPI.apiStatusIsFeatureEnabledGet({
            featureId: Number.NaN,
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

export class FeatureConfiguration<T>{
    featureName: string;
    project: string;
    instance: T;

    constructor(featureName: string, project: string, instance: T) {
        this.featureName = featureName;
        this.project = project;
        this.instance = instance;
    }
}