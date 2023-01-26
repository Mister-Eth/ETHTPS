import { Dropdown } from "./Dropdown"
import { useGetNetworksFromAppStore } from "../../hooks/DataHooks"
import { IDropdownCallback } from "./IDropdownCallback"

export function NetworksDropdown(config: IDropdownCallback<string>) {
  const networks = useGetNetworksFromAppStore()
  return (
    <>
      <Dropdown<string>
        options={networks}
        defaultOption={"Mainnet"}
        hoverText={"Choose network"}
        conversionFunction={(x) => x}
        selectionChanged={config.selectionChanged}
      />
    </>
  )
}
