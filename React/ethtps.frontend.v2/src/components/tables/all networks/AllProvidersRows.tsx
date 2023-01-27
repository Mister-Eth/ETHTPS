import { IProviderTableModel } from "../../../models/tables/IProviderTableModel"
import { TableRow, TableCell } from "@mui/material"
import { IndexCell } from "./cells/IndexCell"
import { NameCell } from "./cells/NameCell"
import { DataValueCell } from "./cells/DataValueCell"
import { MaxValueCell } from "./cells/MaxValueCell"
import { ProviderTypeCell } from "./cells/ProviderTypeCell"
import { SkeletonWithTooltip } from "../../partials/SkeletonWithTooltip"
import { ProviderModel } from "../../../services/api-gen/models/ProviderModel"

export function AllProvidersRows(model: IProviderTableModel): JSX.Element {
  const hasData = (model.providerData?.length as number) > 0
  return (
    <>
      {hasData ? (
        model.providerData?.map((x, i) => (
          <TableRow key={i}>
            <IndexCell clickCallback={model.clickCallback} index={i + 1} />
            <NameCell clickCallback={model.clickCallback} provider={x} />
            <DataValueCell clickCallback={model.clickCallback} provider={x} />
            <MaxValueCell clickCallback={model.clickCallback} provider={x} />
            <ProviderTypeCell
              clickCallback={model.clickCallback}
              provider={x}
            />
          </TableRow>
        ))
      ) : (
        <TableRow key={0}>
          <TableCell>
            <SkeletonWithTooltip rectangular />
          </TableCell>
          <TableCell>
            <SkeletonWithTooltip rectangular />
          </TableCell>
          <TableCell>
            <SkeletonWithTooltip rectangular />
          </TableCell>
          <TableCell>
            <SkeletonWithTooltip rectangular />
          </TableCell>
          <TableCell>
            <SkeletonWithTooltip rectangular />
          </TableCell>
        </TableRow>
      )}
    </>
  )
}
