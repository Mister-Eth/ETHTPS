import { inline, uniform } from "../../Types"
import { IObjectWithProvider } from "../../models/interfaces/IObjectWithProvider"
import { ProviderModel } from "../../services/api-gen"
import { Box, Typography } from "@mui/material"

interface ILargeProviderHeaderConfiguration extends IObjectWithProvider {}

export function LargeProviderHeader(config: ILargeProviderHeaderConfiguration) {
  return (
    <>
      <div className={"box"}>
        <img
          alt={`${config.provider?.name} image`}
          src={`/provider-icons/${config.provider?.name}.png`}
          {...inline}
          {...uniform("2em")}
        ></img>
        <Typography
          {...inline}
          sx={{
            fontWeight: "bold",
            fontSize: "2em",
            marginLeft: "0.2em",
          }}
        >
          {config.provider?.name}
        </Typography>
      </div>
    </>
  )
}
