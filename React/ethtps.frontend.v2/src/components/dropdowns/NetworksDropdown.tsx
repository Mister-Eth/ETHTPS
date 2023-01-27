import { Dropdown } from "./Dropdown"
import { useGetNetworksFromAppStore } from "../../hooks/DataHooks"
import { IDropdownCallback } from "./IDropdownCallback"
import { Typography } from "@mui/material"

export function NetworksDropdown(config: IDropdownCallback<string>) {
  const networks = useGetNetworksFromAppStore()
  return (
    <>
      <Dropdown<string>
        options={networks}
        defaultOption={"Mainnet"}
        hoverText={<Typography>{"Choose network"}</Typography>}
        conversionFunction={(x) => x}
        selectionChanged={config.selectionChanged}
      />
    </>
  )
}
