import React, { useState, useEffect } from "react"
import { ProviderModel } from '../../services/api-gen/models/ProviderModel';
import { IProviderModel } from '../../models/interfaces/IProviderModel';
import { ProviderResponseModel } from "../../services/api-gen";
import { useSelector } from "react-redux";
import { ApplicationState } from '../../models/dependencies/ApplicationState';

interface IProviderTableData {
    providers?: IProviderModel[]
}

export function ProviderTablePartial(data: IProviderTableData) {
    return <>
        Provider table with <b>{data.providers?.length === undefined ? 'no' : data.providers?.length} provider{data.providers?.length != 1 ? "s" : ""} </b>
    </>
}