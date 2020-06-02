import { createMuiTheme } from "@material-ui/core/styles";

const OuterTheme = createMuiTheme({
  typography: {
    // useNextVariants: true,
    fontFamily: ['"Helvetica Neue"', "Helvetica", "sans-serif"].join(","),
    fontSize: 14,
  },
});

export default OuterTheme;
