import { Dropdown } from "./Dropdown"
import { useGetNetworksFromAppStore } from "../../hooks/DataHooks"
import { Typography } from "@mui/material"
import { IDropdownConfig } from "./IDropdownConfig"

export function NetworksDropdown(config: IDropdownConfig<string>) {
  const networks = useGetNetworksFromAppStore()
  return (
    <>
      <Dropdown<string>
        hidden={config.hidden}
        options={networks}
        defaultOption={"Mainnet"}
        hoverText={<Typography>{"Choose network"}</Typography>}
        conversionFunction={(x) => x}
        selectionChanged={config.selectionChanged}
      />
    </>
  )
}
