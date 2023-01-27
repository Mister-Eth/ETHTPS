import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
} from "@mui/material"
import { IProviderTableModel } from "../../../models/tables/IProviderTableModel"
import { AllProvidersHeader } from "./AllProvidersHeader"
import { AllProvidersRows } from "./AllProvidersRows"

export function AllProvidersTable(tableData: IProviderTableModel): JSX.Element {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          minWidth: 750,
        }}
        aria-label="collapsible table"
      >
        <TableHead>
          <AllProvidersHeader />
        </TableHead>
        <TableBody>
          <AllProvidersRows {...tableData} />
        </TableBody>
      </Table>
    </TableContainer>
  )
}
