import { createTheme } from "@mui/material"
import { green, purple } from "@mui/material/colors"

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: "#90caf9",
    },
    background: {
      default: "#ffffff",
    },
  },
})
