import { IObjectWithProvider } from "../../models/interfaces/IObjectWithProvider"
import { ProviderModel } from "../../services/api-gen"
import { Typography } from "@mui/material"

interface ILargeProviderHeaderConfiguration extends IObjectWithProvider {}

export function LargeProviderHeader(config: ILargeProviderHeaderConfiguration) {
  return (
    <>
      <Typography>{config.provider?.name}</Typography>
    </>
  )
}
