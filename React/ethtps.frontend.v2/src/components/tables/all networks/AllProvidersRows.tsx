import { IProviderTableModel } from "../../../models/tables/IProviderTableModel"
import { TableRow, TableCell } from "@mui/material"
import { IndexCell } from "./cells/IndexCell"
import { NameCell } from "./cells/NameCell"
import { DataValueCell } from "./cells/DataValueCell"
import { MaxValueCell } from "./cells/MaxValueCell"
import { ProviderTypeCell } from "./cells/ProviderTypeCell"
import { SkeletonWithTooltip } from "../../partials/SkeletonWithTooltip"

export function AllProvidersRows(rowData: IProviderTableModel): JSX.Element {
  const hasData = (rowData.providerData?.length as number) > 0
  return (
    <>
      {hasData ? (
        rowData.providerData?.map((x, i) => (
          <TableRow key={i}>
            <IndexCell index={i + 1} />
            <NameCell provider={x} />
            <DataValueCell provider={x} />
            <MaxValueCell provider={x} />
            <ProviderTypeCell provider={x} />
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
