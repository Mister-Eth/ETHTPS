import { IProviderTableModel } from "../../../models/tables/IProviderTableModel"
import { TableCell, TableRow } from "@mui/material"
import { IndexCell } from "./cells/IndexCell"
import { NameCell } from "./cells/NameCell"
import { DataValueCell } from "./cells/DataValueCell"
import { MaxValueCell } from "./cells/MaxValueCell"
import { ProviderTypeCell } from "./cells/ProviderTypeCell"

export function AllProvidersRows(rowData: IProviderTableModel): JSX.Element {
  return (
    <>
      {rowData.providerData?.map((x, i) => (
        <TableRow key={i}>
          <IndexCell index={i + 1} />
          <NameCell provider={x} />
          <DataValueCell provider={x} />
          <MaxValueCell provider={x} />
          <ProviderTypeCell provider={x} />
        </TableRow>
      ))}
    </>
  )
}
