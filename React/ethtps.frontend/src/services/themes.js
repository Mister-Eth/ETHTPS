import { createTheme } from "@mui/material";
import { green, purple } from '@mui/material/colors';
import { createGlobalStyle} from "styled-components";

let theme = {
    palette: {
      light: {
        body: "white",
        text: 'black'
      },
      dark: {
        body: "#171723",
        text: 'white',
        c2: '#490092',
        c3: '#1b1c1b'
      },
    },
  };

export const GlobalLightStyles = createGlobalStyle`
  body {
    background-color: ${theme.palette.light.body};
    color: ${theme.palette.light.text};
    transition: all 0.50s linear;
  }

  a {
    color: ${theme.palette.light.text};
    cursor: pointer;
  }

  .inverted {
      filter: invert(0);
  }
`;

export const GlobalDarkStyles = createGlobalStyle`
  body {
    background-color: ${theme.palette.dark.body};
    color: ${theme.palette.dark.text};
    transition: all 0.50s linear;
  }

  a {
    color: ${theme.palette.dark.text};
    cursor: pointer;
  }

  .inverted {
      filter: invert(1);
  }

  .semi-inverted{
      filter: invert(0.5);
  }

  .theme-contrast{
    background-color: ${theme.palette.dark.text};
  }

  .tooltip {
    border-bottom: 1px dotted ${theme.palette.dark.text}};
  }

  hr{
      background-color: ${theme.palette.dark.text};
  }

  .MuiButtonBase-root {
    color: ${theme.palette.dark.text};
    background-color: ${theme.palette.dark.c3};
  }

  .Mui-selected {
    background-color: ${theme.palette.dark.c2};
  }

`;

let darkMode = false;
const setDarkMode = function(value){
    darkMode = value;
}

const isDarkMode = function(){
    return darkMode;
}

export { theme, setDarkMode, isDarkMode };