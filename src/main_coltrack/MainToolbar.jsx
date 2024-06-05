import React, { useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Toolbar, IconButton, OutlinedInput, InputAdornment, Popover, FormControl, InputLabel, Select, MenuItem, FormGroup, FormControlLabel, Checkbox, Badge, ListItemButton, ListItemText, Tooltip,
  Button,
} from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MapIcon from '@mui/icons-material/Map';
import ViewListIcon from '@mui/icons-material/ViewList';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from '../common/components/LocalizationProvider';
import { useDeviceReadonly } from '../common/util/permissions';
import DeviceRow from './DeviceRow';
import { FilterIcon } from '../resources/images/coltrack/Images';

const useStyles = makeStyles((theme) => ({
  toolbarContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 9,
    padding: '0 20px 10px',
    [theme.breakpoints.up('md')]: {
      paddingRight: 0,
      paddingLeft: 0,
    },
    [theme.breakpoints.down('md')]: {
      gap: 0,
    },
  },
  toolbar: {
    display: 'flex',
    gap: theme.spacing(1.5),
    padding: 0,
    [theme.breakpoints.up('md')]: {
      minHeight: 'max-content',
    },
    '& .filter-icon': {
      fill: theme.palette.primary.main,
    },
    '& > .MuiOutlinedInput-root': {
      paddingRight: 8,
      backgroundColor: theme.palette.mode === 'light' && '#afd8ff',
      '& > input::placeholder': {
        opacity: 0.7,
      },
    },
  },
  filterPanel: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    gap: theme.spacing(2),
    width: theme.dimensions.drawerWidthTablet,
  },
  addDevice: {
    backgroundColor: theme.palette.primary.main,
    margin: 0,
    width: 30,
    height: 30,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      opacity: 0.8,
    },
  },
}));

const QuantityButton = ({ onClick, quantity, text, active }) => (
  <Button
    className={active ? 'active' : ''}
    variant="contained"
    onClick={onClick}
  >
    <div>{quantity}</div>
    <div>{text}</div>
  </Button>
);

const MainToolbar = ({
  filteredDevices,
  devicesOpen,
  setDevicesOpen,
  keyword,
  setKeyword,
  filter,
  setFilter,
  filterSort,
  setFilterSort,
  filterMap,
  setFilterMap,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();
  const t = useTranslation();

  const desktop = useMediaQuery(theme.breakpoints.up('md'));

  const deviceReadonly = useDeviceReadonly();

  const groups = useSelector((state) => state.groups.items);
  const devices = useSelector((state) => state.devices.items);

  const toolbarRef = useRef();
  const inputRef = useRef();
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [devicesAnchorEl, setDevicesAnchorEl] = useState(null);

  const deviceStatusCount = (status) => Object.values(devices).filter((d) => d.status === status).length;

  const setDevicesOpenHandler = useCallback((value) => {
    if (desktop) return;
    setDevicesOpen(value);
  }, [desktop]);

  const handleButtonClick = (option) => () => {
    if (filterMap !== true && !option?.length !== 0) {
      setFilterMap(true);
    }

    return setFilter({ ...filter, statuses: option });
  };

  return (
  <div className={classes.toolbarContainer}>
    <Toolbar ref={toolbarRef} className={classes.toolbar}>
      { !desktop ? (
      <IconButton edge="start" onClick={() => setDevicesOpen(!devicesOpen)}>
        {devicesOpen ? <MapIcon /> : <ViewListIcon />}
      </IconButton>
      ) : null }
      <OutlinedInput
        ref={inputRef}
        placeholder={t('sharedSearchDevices')}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onFocus={() => setDevicesAnchorEl(toolbarRef.current)}
        onBlur={() => setDevicesAnchorEl(null)}
        endAdornment={(
          <InputAdornment position="end">
            <IconButton size="small" edge="end" onClick={() => setFilterAnchorEl(inputRef.current)}>
              <Badge color="info" variant="dot" invisible={!filter.statuses.length && !filter.groups.length}>
                <FilterIcon />
              </Badge>
            </IconButton>
          </InputAdornment>
        )}
        size="small"
        fullWidth
      />
      <Popover
        open={!!devicesAnchorEl && !devicesOpen}
        anchorEl={devicesAnchorEl}
        onClose={() => setDevicesAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: Number(theme.spacing(2).slice(0, -2)),
        }}
        marginThreshold={0}
        slotProps={{
          paper: {
            style: { width: `calc(${toolbarRef.current?.clientWidth}px - ${theme.spacing(4)})` },
          },
        }}
        elevation={1}
        disableAutoFocus
        disableEnforceFocus
      >
        {filteredDevices.slice(0, 3).map((_, index) => (
          <DeviceRow key={filteredDevices[index].id} data={filteredDevices} index={index} />
        ))}
        {filteredDevices.length > 3 && (
          <ListItemButton alignItems="center" onClick={() => setDevicesOpen(true)}>
            <ListItemText
              primary={t('notificationAlways')}
              style={{ textAlign: 'center' }}
            />
          </ListItemButton>
        )}
      </Popover>
      <Popover
        open={!!filterAnchorEl}
        anchorEl={filterAnchorEl}
        onClose={() => setFilterAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div className={classes.filterPanel}>
{/*
          <FormControl>
            <InputLabel>{t('deviceStatus')}</InputLabel>
            <Select
              label={t('deviceStatus')}
              value={filter.statuses}
              onChange={(e) => setFilter({ ...filter, statuses: e.target.value })}
              multiple
            >
              <MenuItem value="online">{`${t('deviceStatusOnline')} (${deviceStatusCount('online')})`}</MenuItem>
              <MenuItem value="offline">{`${t('deviceStatusOffline')} (${deviceStatusCount('offline')})`}</MenuItem>
              <MenuItem value="unknown">{`${t('deviceStatusUnknown')} (${deviceStatusCount('unknown')})`}</MenuItem>
            </Select>
          </FormControl>
*/}
          <FormControl>
            <InputLabel>{t('settingsGroups')}</InputLabel>
            <Select
              label={t('settingsGroups')}
              value={filter.groups}
              onChange={(e) => setFilter({ ...filter, groups: e.target.value })}
              multiple
            >
              {Object.values(groups).sort((a, b) => a.name.localeCompare(b.name)).map((group) => (
                <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>{t('sharedSortBy')}</InputLabel>
            <Select
              label={t('sharedSortBy')}
              value={filterSort}
              onChange={(e) => setFilterSort(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">{'\u00a0'}</MenuItem>
              <MenuItem value="name">{t('sharedName')}</MenuItem>
              <MenuItem value="lastUpdate">{t('deviceLastUpdate')}</MenuItem>
            </Select>
          </FormControl>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={filterMap} onChange={(e) => setFilterMap(e.target.checked)} />}
              label={t('sharedFilterMap')}
            />
          </FormGroup>
        </div>
      </Popover>
      <IconButton edge="end" onClick={() => navigate('/settings/device')} disabled={deviceReadonly}>
        <Tooltip open={!deviceReadonly && Object.keys(devices).length === 0} title={t('deviceRegisterFirst')} arrow>
          <AddIcon />
        </Tooltip>
      </IconButton>
    </Toolbar>
    <div className="quantity-buttons">
        <QuantityButton
          onClick={handleButtonClick([])}
          quantity={Object.keys(devices).length}
          text={t('notificationAlways')}
          active={filter.statuses.length === 0}
        />
        <QuantityButton
          onClick={handleButtonClick(['online'])}
          quantity={deviceStatusCount('online')}
          text={t('deviceStatusOnline')}
          active={filter.statuses[0] === 'online'}
        />
        <QuantityButton
          onClick={handleButtonClick(['offline'])}
          quantity={deviceStatusCount('offline')}
          text={t('deviceStatusOffline')}
          active={filter.statuses[0] === 'offline'}
        />
        <QuantityButton
          onClick={handleButtonClick(['unknown'])}
          quantity={deviceStatusCount('unknown')}
          text={t('deviceStatusUnknown')}
          active={filter.statuses[0] === 'unknown'}
        />
    </div>
  </div>
  );
};

export default MainToolbar;