import React from 'react';
import { useTheme } from '@mui/styles';
import { useSelector } from 'react-redux';

import { useLogout } from '../../util/coltrack/authUtils';

const Logout = () => {
  const theme = useTheme();

  const user = useSelector((state) => state.session.user);
  const logout = useLogout();

  const handleLogout = () => {
    logout(user);
  };

  return (
    <button
      className="nav-logout-button"
      title="Salir"
      type="button"
      aria-label="Cerrar sesión"
      onClick={handleLogout}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          fill={theme.palette.secondary.main}
          d="M505 273c9.4-9.4 9.4-24.6 0-33.9L377 111c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l87 87L184 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l246.1 0-87 87c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0L505 273z"
        />
        <path d="M168 80c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 32C39.4 32 0 71.4 0 120L0 392c0 48.6 39.4 88 88 88l80 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-80 0c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l80 0z" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          fill={theme.palette.secondary.main}
          d="M352.6 287.5c3.3 .3 6.7 .5 10.1 .5H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H362.7c-3.5 0-6.8-.6-10-1.6C357.8 96.9 391.4 0 432 0c44.2 0 80 114.6 80 256s-35.8 256-80 256c-40.9 0-74.6-98-79.4-224.5z"
        />
        <path d="M320 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM125.7 175.5c9.9-9.9 23.4-15.5 37.5-15.5c1.9 0 3.8 .1 5.6 .3L137.6 254c-9.3 28 1.7 58.8 26.8 74.5l86.2 53.9-25.4 88.8c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l28.7-100.4c5.9-20.6-2.6-42.6-20.7-53.9L238 299l30.9-82.4 5.1 12.3C289 264.7 323.9 288 362.7 288H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H362.7c-12.9 0-24.6-7.8-29.5-19.7l-6.3-15c-14.6-35.1-44.1-61.9-80.5-73.1l-48.7-15c-11.1-3.4-22.7-5.2-34.4-5.2c-31 0-60.8 12.3-82.7 34.3L57.4 153.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l23.1-23.1zM91.2 352H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h69.6c19 0 36.2-11.2 43.9-28.5L157 361.6l-9.5-6c-17.5-10.9-30.5-26.8-37.9-44.9L91.2 352z" />
      </svg>
    </button>
  );
};

export default Logout;
