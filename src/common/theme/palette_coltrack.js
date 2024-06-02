import { grey } from '@mui/material/colors';

const validatedColor = (color) => (/^#([0-9A-Fa-f]{3}){1,2}$/.test(color) ? color : null);

export default (server, darkMode) => ({
  mode: darkMode ? 'dark' : 'light',
  background: {
    default: darkMode ? '#424242' : '#ececec',
    paper: darkMode ? '#252525' : grey[50],
    main: '#051F38',
  },
  primary: {
    main: validatedColor(server?.attributes?.colorPrimary) || (darkMode ? '#00B5F1' : '#051F38'),
  },
  secondary: {
    main: validatedColor(server?.attributes?.colorSecondary) || '#00B5F1',
  },
  neutral: {
    main: grey[500],
  },
  geometry: {
    main: '#3bb2d0',
  },
});