import { Alert, AlertTitle, Box, Modal, Paper, Typography } from "@mui/material"
import { ProviderModel } from "../../../../services/api-gen/models/ProviderModel"
import { ProviderDataChart } from "../../../charts/ProviderDataChart"
import { ConditionalRender } from "../../../../Types"
import { ProviderCarousel } from "../../navigation/ProviderCarousel"
import { INoDataAvailableEvent } from "../../../INoDataAvailableEvent"
import { useEffect, useState } from "react"
import { tableCellTypographyStandard } from "../../../tables/all networks/cells/Typography.types"
import { useSearchParams } from "react-router-dom"

interface IProviderModalConfiguration extends INoDataAvailableEvent {
  open: boolean
  provider?: ProviderModel
  onClose: () => void
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  border: "2px line #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
}

const generateNoDataAvailableString = (provider?: string) =>
  `There is no data available for ${provider}. If you're seeing this, it probably means there is no chain explorer integration available for ${provider} or that we haven't yet synchronized the data for ${provider} after the update. Please try again later. If you still don't see any data after a while, drop us a message on `

export function ProviderModal(config: IProviderModalConfiguration) {
  const [noData, setNoData] = useState(false)
  return (
    <Modal
      keepMounted={false}
      open={config.open}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      onClose={() => {
        setNoData(false)
        config.onClose()
      }}
    >
      <Box sx={{ ...style }}>
        <Paper elevation={1}>
          <ProviderCarousel provider={config.provider} />
          {ConditionalRender(
            <ProviderDataChart
              onNoDataAvailable={() => setNoData(true)}
              provider={config.provider?.name as string}
            />,
            config.provider !== undefined,
          )}
          {ConditionalRender(
            <>
              <Alert severity="warning">
                <AlertTitle>No data available</AlertTitle>
                {generateNoDataAvailableString(config.provider?.name)}
                <a href="https://discord.com/invite/jWPcsTzpCT">Discord</a>.
                <br />
                <a href="https://github.com/Mister-Eth/ETHTPS/tree/dev/ETHTPS.API/ETHTPS.Services.Ethereum">
                  See a list of available integrations here
                </a>
                .
              </Alert>
            </>,
            noData,
          )}
        </Paper>
      </Box>
    </Modal>
  )
}
