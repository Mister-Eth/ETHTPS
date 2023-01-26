import { Dropdown } from "./Dropdown"
import { useGetNetworksFromAppStore } from "../../hooks/DataHooks"
import { IDropdownCallback } from "./IDropdownCallback"

export function NetworksDropdown(config: IDropdownCallback) {
  const networks = useGetNetworksFromAppStore()
  return (
    <>
      <Dropdown
        options={networks}
        defaultOption={"Mainnet"}
        hoverText={"Choose network"}
        selectionChanged={config.selectionChanged}
      />
    </>
  )
}
