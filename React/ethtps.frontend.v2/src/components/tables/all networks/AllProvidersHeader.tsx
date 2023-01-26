import { TableHeader } from "../TableHeader"
import { useGetLiveDataModeFromAppStore } from "../../../hooks/LiveDataHooks"
import { toShortString } from "../../../Types"

export function AllProvidersHeader(): JSX.Element {
  const mode = useGetLiveDataModeFromAppStore()
  const modeStr = toShortString(mode)
  return (
    <>
      <TableHeader
        text={["#", "Name", modeStr, `Max recorded ${modeStr}`, "Type"]}
      />
    </>
  )
}
