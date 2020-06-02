import { createMuiTheme } from "@material-ui/core/styles";

const darkShades = {
  50: "#d9d9d9",
  100: "#222432",
  200: "#1256d5",
  300: "#ffffff",
  400: "#ffffff",
  500: "#595959",
  600: "#404040",
  700: "#292c3e",
  800: "#292c3e",
  900: "#595e7b",
  A100: "#e3dfdf",
  A200: "#161824",
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
      main: "#3461e4",
      dark: "#3461e4",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#65a61b",
      dark: "#65a61b",
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
      default: "#161824",
      paper: "#161824",
    },
    action: {
      active: "#222432",
      hover: "#222432",
      selected: "#292c3e",
    },
  },
});
