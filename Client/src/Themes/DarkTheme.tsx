import { createMuiTheme } from "@material-ui/core/styles";

const darkShades = {
  50: "#d9d9d9",
  100: "#262626",
  200: "#1256d5",
  300: "#ffffff",
  400: "#ff8b24",
  500: "#595959",
  600: "#404040",
  700: "#262626",
  800: "#121212",
  900: "#332d28",
  A100: "#e3dfdf",
  A200: "#272929",
  A400: "#9a9a9a",
  A700: "#ffffff",
};

export default createMuiTheme({
  typography: {
    // useNextVariants: true,
    fontFamily: ['"Helvetica Neue"', "Helvetica", "sans-serif"].join(","),
    fontSize: 14,
  },
  palette: {
    common: {},
    type: "dark",
    primary: {
      main: "#1256d5",
      dark: "#1256d5",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#5A9E4E",
      dark: "#5A9E4E",
      contrastText: "#ffffff",
    },
    error: {
      main: "#f20000",
      dark: "#f20000",
      contrastText: "#ffffff",
    },
    grey: darkShades,
    text: {
      primary: "#ffffff",
      secondary: "#929292",
    },
    divider: "#262626",
    background: {
      default: "#000000",
      paper: "#333333",
    },
    action: {
      active: "#666666",
      hover: "#666666",
      selected: "#767676",
    },
  },
});
