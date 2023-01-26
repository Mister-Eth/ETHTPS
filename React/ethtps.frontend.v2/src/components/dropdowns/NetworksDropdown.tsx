import { Dropdown } from "./Dropdown"
import { useGetNetworksFromAppStore } from "../../hooks/DataHooks"

export function NetworksDropdown() {
  const networks = useGetNetworksFromAppStore()
  return (
    <>
      <Dropdown options={networks} defaultOption={"Mainnet"} />
    </>
  )
}
