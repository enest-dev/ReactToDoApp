import React from "react";
import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";

type Props = {
  type?: "linear" | "circle";
  size?: number;
  thickness?: number;
};

const styles = (theme: Theme) =>
  createStyles({
    linearProgress: {
      backgroundColor: theme.palette.primary.main,
      width: "100%",
      marginBottom: 5,
      marginTop: 5
    },
    circularProgress: {
      color: theme.palette.primary.main,
    },
  });

const ProgressLoader: React.FC<Props> = (props: Props) => {
  const { type = "circle", size = 30, thickness = 5 } = props;

  return type === "linear" ? (
    <LinearProgress className="linerProgress" />
  ) : (
      <CircularProgress className="circularProgress" size={size} thickness={thickness} />
    );
};

export default withStyles(styles)(ProgressLoader);
export { ProgressLoader as PureProgressLoader };
