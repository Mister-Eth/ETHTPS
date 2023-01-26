import { TableCell, Tooltip, Typography } from "@mui/material"
import { ICustomCellConfiguration } from "./ICustomCellConfiguration"
import { useGetProviderColorDictionaryFromAppStore } from "../../../../hooks/ColorHooks"

import { centered } from "../../Cells.Types"
import { tableCellTypographyStandard } from "./Typography.types"

export function NameCell(config: ICustomCellConfiguration) {
  const colorDictionary = useGetProviderColorDictionaryFromAppStore()
  const name = config.provider?.name ?? ""
  const color: string =
    colorDictionary !== undefined ? colorDictionary[name] : "primary"
  return (
    <Tooltip
      arrow
      title={
        <Typography>{`Click to see more details about ${name}`}</Typography>
      }
    >
      <TableCell {...centered}>
        <>
          <img
            alt={`${config.provider?.name} icon`}
            src={`provider-icons/${config.provider?.name}.png`}
            className={"tiny-img inline"}
            style={{ marginRight: "15px" }}
          ></img>
          <Typography
            className={"inline pointable"}
            color={color}
            {...tableCellTypographyStandard}
          >
            {config.provider?.name}
          </Typography>
        </>
      </TableCell>
    </Tooltip>
  )
}
