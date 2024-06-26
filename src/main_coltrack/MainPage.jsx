import React, {
    useState, useCallback, useEffect,
    useMemo,
  } from 'react';
  import { Paper } from '@mui/material';
  import { makeStyles } from '@mui/styles';
  import { useTheme } from '@mui/material/styles';
  import useMediaQuery from '@mui/material/useMediaQuery';
  import { useDispatch, useSelector } from 'react-redux';
  import DeviceList from './DeviceList';
  import StatusCard from '../common/components/StatusCard';
  import { devicesActions } from '../store';
  import usePersistedState from '../common/util/usePersistedState';
  import EventsDrawer from '../main/EventsDrawer';
  import useFilter from '../main/useFilter';
  import MainToolbar from './MainToolbar';
  import MainMap from '../main/MainMap';
  import { useAttributePreference } from '../common/util/preferences';
  import ToggleSidebar from '../common/components/coltrack/ToggleSidebar';
  
  
  const useStyles = makeStyles((theme) => ({
    root: {
      height: '100%', // Ensuring the root div takes the full viewport height
      display: 'flex',
      flexDirection: 'column', // This will help in stacking the navbar and the content below it.
    },
    sidebar: {
      pointerEvents: 'none',
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.up('md')]: {
        position: 'fixed',
        left: 0,
        top: theme.spacing(8), // Assuming AppBar height is around 64px, theme.spacing(8) equals 64px
        height: `calc(100% - ${theme.spacing(10)})`,
        width: `calc(${theme.dimensions.drawerWidthDesktop} + 80px)`,
        margin: theme.spacing(1.5),
        //marginTop: theme.spacing(10), // Added to push the sidebar below the AppBar
        zIndex: 3,
        padding: 15,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 10,
      },
      [theme.breakpoints.down('md')]: {
        height: `calc(100% - ${theme.spacing(1)})`,
        // top: theme.spacing(24), // theme.spacing(7) equals 56px
        width: '100%',
      },
    },
    header: {
      pointerEvents: 'auto',
      zIndex: 6,
      boxShadow: 'none',
    },
    footer: {
      pointerEvents: 'auto',
      zIndex: 5,
    },
    middle: {
      flex: 1,
      display: 'grid',
    },
    contentMap: {
      pointerEvents: 'auto',
      gridArea: '1 / 1',
      height: `calc(100%)`, // Adjust the map height dynamically
    },
    contentList: {
      boxShadow: 'none',
      pointerEvents: 'auto',
      gridArea: '1 / 1',
      zIndex: 4,
      [theme.breakpoints.up('md')]: {
        borderRadius: 10,
        overflow: 'hidden',
      },
    },
  }));
  
  const MainPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const theme = useTheme();
  
    const desktop = useMediaQuery(theme.breakpoints.up('md'));
  
    const mapOnSelect = useAttributePreference('mapOnSelect', true);
  
    const selectedDeviceId = useSelector((state) => state.devices.selectedId);
    const positions = useSelector((state) => state.session.positions);
    const [filteredPositions, setFilteredPositions] = useState([]);
    const selectedPosition = filteredPositions.find((position) => selectedDeviceId && position.deviceId === selectedDeviceId);
  
    const [filteredDevices, setFilteredDevices] = useState([]);
  
    const [keyword, setKeyword] = useState('');
    const [filter, setFilter] = usePersistedState('filter', {
      statuses: [],
      groups: [],
    });
    const [filterSort, setFilterSort] = usePersistedState('filterSort', '');
    const [filterMap, setFilterMap] = usePersistedState('filterMap', false);
  
    const [devicesOpen, setDevicesOpen] = useState(desktop);
    const [eventsOpen, setEventsOpen] = useState(false);
  
    const onEventsClick = useCallback(() => setEventsOpen(true), [setEventsOpen]);
    const toggleSidebarMemo = useMemo(() => (desktop ? <ToggleSidebar /> : null), [desktop]);
  
    useEffect(() => {
      if (!desktop && mapOnSelect && selectedDeviceId) {
        setDevicesOpen(false);
      }
    }, [desktop, mapOnSelect, selectedDeviceId]);
  
    useFilter(keyword, filter, filterSort, filterMap, positions, setFilteredDevices, setFilteredPositions);
  
    return (
      <div className={classes.root}>
        {desktop && (
          <MainMap
            filteredPositions={filteredPositions}
            selectedPosition={selectedPosition}
            onEventsClick={onEventsClick}
          />
        )}
        <div id="sidebar" className={classes.sidebar}>{ toggleSidebarMemo }
          <Paper square elevation={3} className={`${classes.header} without-bg-i`}>
            <MainToolbar
              filteredDevices={filteredDevices}
              devicesOpen={devicesOpen}
              setDevicesOpen={setDevicesOpen}
              keyword={keyword}
              setKeyword={setKeyword}
              filter={filter}
              setFilter={setFilter}
              filterSort={filterSort}
              setFilterSort={setFilterSort}
              filterMap={filterMap}
              setFilterMap={setFilterMap}
            />
          </Paper>
          <div className={classes.middle}>
            {!desktop && (
              <div className={classes.contentMap}>
                <MainMap
                  filteredPositions={filteredPositions}
                  selectedPosition={selectedPosition}
                  onEventsClick={onEventsClick}
                />
              </div>
            )}
            <Paper square className={classes.contentList} style={devicesOpen ? {} : { visibility: 'hidden' }}>
              <DeviceList devices={filteredDevices} />
            </Paper>
          </div>
        </div>
        <EventsDrawer open={eventsOpen} onClose={() => setEventsOpen(false)} />
        {selectedDeviceId && (
          <StatusCard
            deviceId={selectedDeviceId}
            position={selectedPosition}
            onClose={() => dispatch(devicesActions.selectId(null))}
            desktopPadding={theme.dimensions.drawerWidthDesktop}
          />
        )}
      </div>
    );
  };
  
  export default MainPage;
  