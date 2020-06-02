import React, { useContext } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import { Grid } from '@material-ui/core';
import { AppContext } from '../../../../App';
import { authService } from '@services';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

function MainNav(props) {
  const classes = useStyles();
  const appContext = useContext(AppContext);
  const { userProfile } = appContext;

  // const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = () => {
    authService.signOut();
    appContext.setLoggedIn(false);
    props.history.push('/login')
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid
          container
          item
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Welcome To Todo App
        </Typography>
        </Grid>
        <Grid
          container
          item
          direction="row"
          justify="flex-end"
          alignItems="center"
        >
          <Typography variant="h6" >
            {userProfile?.name}
          </Typography>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            {
              userProfile?.picture ? <Avatar alt="Profile Image" src={userProfile?.picture} /> : <AccountCircle />
            }
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
            transformOrigin={{ vertical: 'top', horizontal: 'right', }}
            keepMounted
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={signOut}>Sign Out</MenuItem>
          </Menu>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
export default withRouter(MainNav);