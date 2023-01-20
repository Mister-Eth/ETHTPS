import '../../..//App.css'
import React, { } from "react"
import 'query-string'
import { IGlobalDependencies } from '../../../models/dependencies/IGlobalDependencies'
import { useGetProvidersTablePartial } from '../../hooks/useGetProvidersTablePartial'

export default function MainPage(dependencies: IGlobalDependencies): JSX.Element {
  const providersTable = useGetProvidersTablePartial()
  return <>
    {providersTable}
  </>
}
