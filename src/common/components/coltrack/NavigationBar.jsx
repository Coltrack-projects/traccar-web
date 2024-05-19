import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { makeStyles } from '@mui/styles';
import { useLogout } from '../../util/coltrack/authUtils';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  logo: {
    maxWidth: 160,
    cursor: 'pointer',
  }
}));

function NavigationBar() {
  const classes = useStyles();
  const user = useSelector((state) => state.session.user);
  const logout = useLogout();

  const handleLogout = () => {
    logout(user);
  };

  const handleLogoClick = () => {
    window.open('https://www.coltrack.com', '_blank');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <img src="/coltrack/logo.png" alt="Coltrack Logo" className={classes.logo} onClick={handleLogoClick} />
        <div className={classes.grow}></div>
        <IconButton color="inherit" onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;
