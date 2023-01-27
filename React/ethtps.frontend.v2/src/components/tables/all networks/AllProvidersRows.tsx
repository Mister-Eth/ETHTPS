import { IProviderTableModel } from "../../../models/tables/IProviderTableModel"
import { TableRow, TableCell, Button } from "@mui/material"
import { IndexCell } from "./cells/IndexCell"
import { NameCell } from "./cells/NameCell"
import { DataValueCell } from "./cells/DataValueCell"
import { MaxValueCell } from "./cells/MaxValueCell"
import { ProviderTypeCell } from "./cells/ProviderTypeCell"
import { SkeletonWithTooltip } from "../../partials/SkeletonWithTooltip"
import { DataType, toShortString } from "../../../Types"
import {
  useGetLiveDataModeFromAppStore,
  useGetLiveDataFromAppStore,
} from "../../../hooks/LiveDataHooks"
import { ILiveDataModeModel } from "../../../models/interfaces/ILiveDataModeModel"
import { useEffect, useState } from "react"
import { objectKeys } from "ts-extras"
import { DataResponseModelDictionary } from "../../../Types.dictionaries"

const getModeData = (
  model: ILiveDataModeModel,
  mode: DataType,
): DataResponseModelDictionary | undefined => {
  switch (mode) {
    case DataType.TPS:
      return model.data?.tps
    case DataType.GPS:
      return model.data?.gps
    case DataType.GTPS:
      return model.data?.gasAdjustedTPS
  }
}

const extractData = (
  dict?: DataResponseModelDictionary,
  providerName?: string,
) => {
  if (dict && providerName && dict[providerName]) {
    if (dict[providerName].at(0)) {
      let result = dict[providerName].at(0).value
      return Math.round(result * 100) / 100
    }
  }
  return 0
}

export function AllProvidersRows(model: IProviderTableModel): JSX.Element {
  const hasData = (model.providerData?.length as number) > 0
  const mode = useGetLiveDataModeFromAppStore()
  const liveData = useGetLiveDataFromAppStore()
  const [data, setData] = useState(getModeData(liveData, mode))
  useEffect(() => {
    setData(getModeData(liveData, mode))
  }, [mode, liveData])
  return (
    <>
      {hasData ? (
        <>
          {model.providerData
            ?.slice(
              0,
              Math.min(
                model.providerData?.length,
                model.maxRowsBeforeShowingExpand as number,
              ),
            )
            ?.map((x, i) => (
              <TableRow key={i}>
                <IndexCell clickCallback={model.clickCallback} index={i + 1} />
                <NameCell clickCallback={model.clickCallback} provider={x} />
                <DataValueCell
                  clickCallback={model.clickCallback}
                  provider={x}
                  dataType={mode}
                  value={extractData(data, x.name)}
                />
                <MaxValueCell
                  clickCallback={model.clickCallback}
                  provider={x}
                />
                <ProviderTypeCell
                  clickCallback={model.clickCallback}
                  provider={x}
                />
              </TableRow>
            ))}
        </>
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
