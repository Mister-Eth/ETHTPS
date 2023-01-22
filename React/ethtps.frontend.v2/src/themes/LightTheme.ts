import { createTheme } from "@mui/material";
import { green, orange, purple } from "@mui/material/colors";

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
    background: {
      default: "#ffffff",
    },
  },
});
