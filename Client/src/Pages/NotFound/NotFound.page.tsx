import React from "react";
import { Button, createStyles, Theme, withStyles } from "@material-ui/core";

import "./NotFound.page.scss";

type Props = {
  classes?: {
    title: string;
    message: string;
  };
};

const styles = (theme: Theme) =>
  createStyles({
    title: {
      color: theme.palette.primary.main,
    },
    message: {
      color: theme.palette.grey["A700"],
    },
  });

const NotFoundPage: React.FC<Props> = ({ classes }) => {
  return (
    <div className="page-not-found">
      <div className={`page-not-found__title ${classes.title}`}>404</div>
      <div className={`page-not-found__message ${classes.message}`}>Page you are looking for could not be found</div>
      <div className="page-not-found__control">
        <Button href="/" color="primary" variant="contained" size="large">
          Go to the main page
        </Button>
      </div>
    </div>
  );
};

export default withStyles(styles)(NotFoundPage);
