import { createMuiTheme } from "@material-ui/core/styles";

const lightShades = {
  50: "#303030",
  100: "#a3a3a3",
  200: "#ffffff",
  300: "#1256d5",
  400: "#ff8b24",
  500: "#B3B3B3",
  600: "#A3A3A3",
  700: "#ffffff",
  800: "#ffffff",
  900: "#ffe7ae",
  A100: "#666666",
  A200: "#272929",
  A400: "#404040",
  A700: "#303030",
};

export default createMuiTheme({
  typography: {
    // useNextVariants: true,
    fontFamily: ['"Helvetica Neue"', "Helvetica", "sans-serif"].join(","),
    fontSize: 14,
  },
  palette: {
    common: {},
    primary: {
      main: "#1256d5",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#5A9E4E",
      contrastText: "#ffffff",
    },
    error: {
      main: "#f20000",
      contrastText: "#ffffff",
    },
    grey: lightShades,
    text: {
      primary: "#2f3030",
      secondary: "#929292",
    },
    divider: "#979797",
    background: {
      default: "#f2f3f8",
      paper: "#f2f3f8",
    },
    action: {
      active: "#e9e9e9",
      hover: "#f9f9f9",
      selected: "#e9e9e9",
    },
  },
});
