import { inline, uniform } from "../../Types"
import { IObjectWithProvider } from "../../models/interfaces/IObjectWithProvider"
import { ProviderModel } from "../../services/api-gen"
import { Typography } from "@mui/material"

interface ILargeProviderHeaderConfiguration extends IObjectWithProvider {}

export function LargeProviderHeader(config: ILargeProviderHeaderConfiguration) {
  return (
    <>
      <img
        alt={`${config.provider?.name} image`}
        {...inline}
        {...uniform("2em")}
      ></img>
      <Typography
        {...inline}
        sx={{
          fontWeight: "bold",
          fontSize: "2em",
        }}
      >
        {config.provider?.name}
      </Typography>
    </>
  )
}
