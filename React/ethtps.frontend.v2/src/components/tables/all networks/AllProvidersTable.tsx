import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  Button,
} from "@mui/material"
import { IProviderTableModel } from "../../../models/tables/IProviderTableModel"
import { AllProvidersHeader } from "./AllProvidersHeader"
import { AllProvidersRows } from "./AllProvidersRows"
import { ConditionalRender } from "../../../Types"
import { useState } from "react"
import * as iconsMaterial from "@mui/icons-material"
import { SeeMoreButton } from "../../buttons/SeeMoreButton"

export function AllProvidersTable(tableData: IProviderTableModel): JSX.Element {
  const oldShowRowCountValue = tableData.maxRowsBeforeShowingExpand as number
  const [showRowCount, setShowRowCount] = useState(
    tableData?.maxRowsBeforeShowingExpand as number,
  )
  const onSeeMore = () => {
    setShowRowCount(tableData.providerData?.length as number)
  }
  const onSeeLess = () => {
    console.log(oldShowRowCountValue)
    setShowRowCount(oldShowRowCountValue)
  }
  return (
    <>
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
            <AllProvidersRows
              {...tableData}
              maxRowsBeforeShowingExpand={showRowCount}
            />
          </TableBody>
        </Table>
      </TableContainer>
      {ConditionalRender(
        <SeeMoreButton onSeeMore={onSeeMore} onSeeLess={onSeeLess} />,
        showRowCount > 0,
      )}
    </>
  )
}
