import React, { Component } from "react";
import { isCompositeComponentWithType } from "react-dom/test-utils";
import { HomePageResponseModel } from "../../services/api-gen/src";
import Table from '@mui/material/Table';
export default class ProviderTable extends Component<HomePageResponseModel, {}> {
    constructor(props: HomePageResponseModel) {
        super(props);
    }

    render() {
        return <>
            Table
        </>;
    }
}