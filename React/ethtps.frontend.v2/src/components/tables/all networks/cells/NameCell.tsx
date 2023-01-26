import { TableCell, Tooltip } from "@mui/material"
import { ICustomCellConfiguration } from "./ICustomCellConfiguration"
import { useGetProviderColorDictionaryFromAppStore } from "../../../../hooks/ColorHooks"
import React from "react"
import { openNewTab } from "../../../../services/LinksHelper"
import { FullScreenProviderDialog } from "../../../partials/dialogs/full screen/FullScreenProviderDialog"

export function NameCell(config: ICustomCellConfiguration) {
  const colorDictionary = useGetProviderColorDictionaryFromAppStore()
  const name = config.provider?.name ?? ""
  const color: string =
    colorDictionary !== undefined ? colorDictionary[name] : "primary"
  return (
    <React.Fragment>
      <Tooltip title={"Click to see more details"}>
        <TableCell
          sx={{ color: color, fontWeight: "bold", cursor: "pointer" }}
          onClick={() => openNewTab(`/Providers/${config.provider?.name}`)}
        >
          <img
            alt={`${config.provider?.name} icon`}
            src={`provider-icons/${config.provider?.name}.png`}
            className={"tiny-img inline"}
            style={{ marginRight: "15px" }}
          ></img>
          {config.provider?.name}
        </TableCell>
      </Tooltip>
      <FullScreenProviderDialog />
    </React.Fragment>
  )
}
