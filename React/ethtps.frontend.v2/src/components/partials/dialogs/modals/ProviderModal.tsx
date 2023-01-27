import { Box, Modal, Paper } from "@mui/material"
import { ProviderModel } from "../../../../services/api-gen/models/ProviderModel"
import { ProviderDataChart } from "../../../charts/ProviderDataChart"

interface IProviderModalConfiguration {
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
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
}

export function ProviderModal(config: IProviderModalConfiguration) {
  return (
    <Modal
      keepMounted={false}
      open={config.open}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      onClose={config.onClose}
    >
      <Box sx={{ ...style }}>
        <Paper elevation={1}>
          {config.provider !== undefined ? (
            <ProviderDataChart provider={config.provider?.name as string} />
          ) : (
            <></>
          )}
        </Paper>
      </Box>
    </Modal>
  )
}
