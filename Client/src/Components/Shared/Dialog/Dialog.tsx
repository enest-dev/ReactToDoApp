import React from "react";
import { Dialog as MaterialDialog } from "@material-ui/core";
import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import ClearIcon from '@material-ui/icons/Clear';

import "./Dialog.scss";

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    dialogPaper: {},
    dialogTitleWrap: {
      borderColor: theme.palette.grey["100"],
    },
  });

type Props = {
  children: React.ReactChildren;
  title: string | React.ReactNode;
  subtitle: string | React.ReactNode;
  dialogContent: () => React.ReactNode;
  dialogActions: () => React.ReactNode;
  closeBtn: boolean;
  fullScreen: boolean;
  disableBackdropClick: boolean;
  disableEscapeKeyDown: boolean;
  onEnter: () => void;
  open: boolean;
  onClose: (event: React.SyntheticEvent) => any;
  uniquePaperClass: string;
  classes: {
    root: string;
    dialogPaper: string;
    dialogTitleWrap: string;
  };
};

class Dialog extends React.Component<Props> {
  public static defaultProps = {
    children: null,
    title: null,
    subtitle: null,
    dialogContent: null,
    dialogActions: null,
    closeBtn: true,
    fullScreen: false,
    disableBackdropClick: false,
    disableEscapeKeyDown: false,
    onEnter: null,
    open: false,
    onClose: null,
    uniquePaperClass: null,
  };

  public render() {
    const dialogProps = this.props;
    return (
      <MaterialDialog
        classes={{
          root: `dialog-wrapper ${dialogProps.classes.root}`,
          paper: `dialog-wrapper__papersize ${dialogProps.classes.dialogPaper} ${dialogProps.uniquePaperClass}`,
        }}
        BackdropProps={{
          id: "dialogBackdrop",
        }}
        maxWidth={false}
        fullScreen={dialogProps.fullScreen}
        open={dialogProps.open}
        onClose={dialogProps.onClose}
        disableBackdropClick={dialogProps.disableBackdropClick}
        disableEscapeKeyDown={dialogProps.disableEscapeKeyDown}
        onEnter={dialogProps.onEnter}
      >
        <React.Fragment>
          <div className={`dialog-wrapper__titlewrap ${dialogProps.classes.dialogTitleWrap}`}>
            {dialogProps.title instanceof Function ? (
              dialogProps.title()
            ) : (
                <h3 className="dialog-wrapper__title">{dialogProps.title}</h3>
              )}
            {dialogProps.subtitle && <h4 className="dialog-wrapper__subtitle">{dialogProps.subtitle}</h4>}
          </div>
          {dialogProps.closeBtn && (
            <div className="dialog-wrapper__close" onClick={dialogProps.onClose}>
              <ClearIcon />
            </div>
          )}
          <div className="dialog-wrapper__content">{dialogProps.dialogContent()}</div>
          {dialogProps.dialogActions && <div className="dialog-wrapper__actions">{dialogProps.dialogActions()}</div>}
        </React.Fragment>
      </MaterialDialog>
    );
  }
}

export default withStyles(styles)(Dialog);
