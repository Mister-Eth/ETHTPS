import { TableCell, Tooltip, Typography } from "@mui/material"
import {
  ICustomCellConfiguration,
  buildClassNames,
} from "./ICustomCellConfiguration"
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
      placement="right"
      title={<Typography>{`Click to read more about ${name}`}</Typography>}
    >
      <TableCell
        {...centered}
        {...buildClassNames(config)}
        onClick={() =>
          config.clickCallback !== undefined
            ? config.clickCallback(config.provider, "Name")
            : () => {}
        }
      >
        <>
          <img
            alt={`${config.provider?.name} icon`}
            src={`provider-icons/${config.provider?.name}.png`}
            className={"tiny-img inline"}
            style={{ marginRight: "15px" }}
          ></img>
          <Typography
            className={`inline ${
              config.clickCallback !== undefined ? "pointable" : ""
            }`}
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
