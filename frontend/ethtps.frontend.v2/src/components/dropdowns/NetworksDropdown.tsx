import { Dropdown } from "./Dropdown"
import { Typography } from "@mui/material"
import { IDropdownConfig } from "./IDropdownConfig"
import { useGetNetworksFromAppStore } from "ethtps.data/dist/hooks/DataHooks"

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
