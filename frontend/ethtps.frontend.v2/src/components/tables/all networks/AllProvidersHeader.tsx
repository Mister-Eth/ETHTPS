import { TableHeader } from "../TableHeader"
import { toShortString } from "../../../Types"
import { liveDataHooks } from "ethtps.data"

export function AllProvidersHeader(): JSX.Element {
  const mode = liveDataHooks.useGetLiveDataModeFromAppStore()
  const modeStr = toShortString(mode)
  return (
    <>
      <TableHeader
        text={["#", "Name", modeStr, `Max recorded ${modeStr}`, "Type"]}
      />
    </>
  )
}
