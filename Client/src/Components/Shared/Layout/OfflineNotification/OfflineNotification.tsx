import * as React from "react";
import { Offline } from "react-detect-offline";
import { withStyles, createStyles, Theme } from "@material-ui/core";
import { InfoOutlined } from "@material-ui/icons";
import { darken } from "@material-ui/core/styles/colorManipulator";

import "./OfflineNotification.scss";

type Props = {
  message: string;
  classes?: {
    offlineNotification: string;
  };
};

const styles = (theme: Theme) =>
  createStyles({
    offlineNotification: {
      color: theme.palette.error.contrastText,
      backgroundColor: theme.palette.error.main,
      borderColor: darken(theme.palette.error.main, 0.1),
    },
  });

const OfflineNotification: React.FC<Props> = (props: Props) => {
  return (
    <Offline>
      <div className={`offline-notification ${props.classes.offlineNotification}`}>
        <InfoOutlined className="offline-notification__icon">Info</InfoOutlined>
        <div className="offline-notification__text">{props.message}</div>
      </div>
    </Offline>
  );
};

export default withStyles(styles)(OfflineNotification);
export { OfflineNotification as PureOfflineNotification };
