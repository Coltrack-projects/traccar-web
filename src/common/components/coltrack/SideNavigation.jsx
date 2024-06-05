import React, { useState } from 'react';
import {
  Box, Drawer, IconButton, List
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useLocation } from 'react-router-dom';
import NavRoutes from './constants';
import { SideNavigationMultiLevel, SideNavigationSingleLevel } from './SideNavigationItems';
import { useTranslation } from '../../../common/components/LocalizationProvider';
import MapIcon from '@mui/icons-material/Map';
import Logout from './Logout';

const useStyles = makeStyles((theme) => ({
  drawer: {
    '& .MuiPaper-root': {
      backgroundColor: theme.palette.background.main,
      marginTop: theme.spacing(8), // Assuming the AppBar height is 64px (8 * theme spacing unit)
      height: `calc(100% - ${theme.spacing(9)})`
    },
    '& a': {
      color: '#fff',
      textDecoration: 'none',
    },
    '& svg, & span': {
      color: '#fff',
    },
    '& .Mui-selected, & .Mui-selected:hover': {
      backgroundColor: '#00b5f129',
    },
    '& .MuiButtonBase-root:hover': {
      backgroundColor: '#ffffff14',
    },
  },
}));


const SideNavigationList = ({ closeDrawer }) => {
  const routes = Object.values(NavRoutes());
  const location = useLocation();
  const t = useTranslation();

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <SideNavigationSingleLevel
        key="home"
        closeDrawer={closeDrawer}
        selected={location.pathname === '/'}
        route="/"
        icon={<MapIcon />}
        label={t('mapTitle')}
        title={t('mapTitle')}
      />
      {
        routes.map((props) => {
          const activeDropdown = props.dropdown.length > 0;
          return (
            activeDropdown ? (
              <SideNavigationMultiLevel
                key={`multi-${props.route}`}
                closeDrawer={closeDrawer}
                pathname={location.pathname}
                {...props}
              />
            ) : (
              <SideNavigationSingleLevel
                key={`single-${props.route}`}
                closeDrawer={closeDrawer}
                selected={location.pathname === props.route}
                {...props}
              />
            )
          );
        })
      }
      <SideNavigationSingleLevel
        key="logout"
        closeDrawer={() => {
          closeDrawer();
          logout(user);
          window.location.href = '/login';
        }}
        route="/login"
        icon={<Logout />}
        label={t('loginLogout')}
        title={t('loginLogout')}
      />
    </List>
  );
};

const SideNavigation = () => {
  const classes = useStyles();
  const [statusDrawer, setStatusDrawer] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setStatusDrawer(!statusDrawer);  // Toggle the state
  };

  const closeDrawer = () => {
    setStatusDrawer(false);
  };

  return (
    <>
      <IconButton color="inherit" onClick={toggleDrawer(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          width="23.5"
          height="23.5"
          fill="#fff"
        >
          <path d="M0 88C0 74.7 10.7 64 24 64H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H24C10.7 112 0 101.3 0 88z" />
          <path fill="#00B5F1" d="M0 248c0-13.3 10.7-24 24-24H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24z" />
          <path d="M448 408c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H424c13.3 0 24 10.7 24 24z" />
        </svg>
      </IconButton>

      <Drawer className={`${classes.drawer} without-bg-i`} open={statusDrawer} anchor="right" onClose={toggleDrawer(false)}>
        <Box sx={{ width: 280 }} role="presentation">
          <SideNavigationList closeDrawer={closeDrawer} />
        </Box>
      </Drawer>
    </>
  );
};

export default SideNavigation;
