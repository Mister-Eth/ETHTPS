import React, { useState } from "react"
import { IntervalDropdown } from "../dropdowns/IntervalDropdown"
import { NetworksDropdown } from "../dropdowns/NetworksDropdown"
import Container from "@mui/material/Container/Container"
import { ModeDropdown } from "../dropdowns/ModeDropdown"

interface IProviderDataChartConfiguration {
  provider: string
}

export function ProviderDataChart(config: IProviderDataChartConfiguration) {
  const displayNetworksDropdown = config.provider.toUpperCase() === "ETHEREUM"

  const [interval, setInterval] = useState("1d")
  const [network, setNetwork] = useState("Mainnet")
  const [mode, setMode] = useState("TPS")

  const intervalChanged = (interval: string) => {
    setInterval(interval)
  }
  const modeChanged = (mode: string) => {
    setMode(mode)
  }
  const networkChanged = (network: string) => {
    setNetwork(network)
  }

  return (
    <React.Fragment>
      <Container
        sx={{
          borderThickness: "1px",
          borderColor: "primary",
          borderBlockColor: "primary",
        }}
      >
        {displayNetworksDropdown ? (
          <NetworksDropdown selectionChanged={networkChanged} />
        ) : (
          <></>
        )}
        <div style={{ float: "right" }}>
          <IntervalDropdown selectionChanged={intervalChanged} />
          <ModeDropdown selectionChanged={modeChanged} />
        </div>
      </Container>
    </React.Fragment>
  )
}
