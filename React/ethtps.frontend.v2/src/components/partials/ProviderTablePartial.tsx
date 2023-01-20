import React, { useState, useEffect } from "react"
import { ProviderModel } from '../../services/api-gen/models/ProviderModel';
import { IProviderModel } from '../../models/interfaces/IProviderModel';
import { ProviderResponseModel } from "../../services/api-gen";
import { useSelector } from "react-redux";
import { ApplicationState } from '../../models/dependencies/ApplicationState';
import { store, AppDispatch, useAppDispatch } from '../../store';
import { useGetProvidersFromAppStore, addProviderToAppState } from '../../hooks/providerHooks';
import { addProvider } from "../../slices/ProvidersSlice";

export function ProviderTablePartial() {
    const providers = useGetProvidersFromAppStore()
    const clickTest = () => {
        console.log(2)
        addProviderToAppState(new ProviderModel())
    }
    return <>
        Provider table with <b>{providers?.length === undefined ? 'no' : providers?.length} provider{providers?.length != 1 ? "s" : ""} </b>
        <button onClick={clickTest}>
            Please work
        </button>
    </>
}