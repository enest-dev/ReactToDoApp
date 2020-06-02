import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  typography: {
    // useNextVariants: true,
  },
  palette: {
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
    divider: "#979797",
    background: {
      default: "#f2f3f8",
    },
  },
});
