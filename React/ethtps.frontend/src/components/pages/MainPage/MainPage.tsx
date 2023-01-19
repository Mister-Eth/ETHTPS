import '../../..//App.css'
import React, { useState, useEffect } from "react"
import 'query-string'
import { MainPageModel } from './MainPageModel'
import LoadingPage from '../loading/LoadingPage'
import { useQueryClient, useQuery } from 'react-query'
import { GeneralApiAPIV2ProvidersGetRequest } from '../../../services/api-gen/types/ObjectParamAPI'
import { ETHTPSApi } from '../../../services/api/ETHTPSApi'
import { IGlobalDependencies } from '../../../models/dependencies/IGlobalDependencies'
import { ProviderModel } from '../../../services/api-gen/models/ProviderModel';
import { RequestContext } from '../../../services/api-gen/http/http';
import { Configuration, createConfiguration } from '../../../services/api-gen/configuration';

export default function MainPage(dependencies: IGlobalDependencies): JSX.Element {
  const [providers, setProviders] = useState([ProviderModel])
  let x = useQuery('test', () => dependencies.generalApi?.aPIV2AllDataGet());
  console.log(x)
  return (
    <> <p>{JSON.stringify(x)}</p>
      <LoadingPage />
    </>
  )
}
