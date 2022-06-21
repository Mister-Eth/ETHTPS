import React, { Component } from "react";
import { isCompositeComponentWithType } from "react-dom/test-utils";
import { HomePageResponseModel } from "../../services/api-gen/src";
import Table from '@mui/material/Table';
import { Util } from '../../services/Util';
export default class ProviderTable extends Component<HomePageResponseModel, HomePageResponseModel> {
    constructor(props: HomePageResponseModel) {
        super(props);
    }

    render() {
        if (Util.isNullOrUndefined(this.state)){
            return <></>
        }
        return <>
            {Object.keys(this.state?.providers).map(x=><>x</>)}
        </>;
    }
}