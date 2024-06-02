import React from 'react';
import './DropdownMenu.css';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';

const DropdownMenuItem = ({ dropdown }) => (
  <section className="sub-menu">
    <ul className="list-item" data-children-count={dropdown.length > 12}>
      {
        dropdown.map(({ title, route, icon, active }) => (
          active === false ? null : (
            <li key={`route-${title}`}>
              <Link to={route}>
                {icon}
                {title}
              </Link>
            </li>
          )
        ))
      }
    </ul>
  </section>
);

const DropdownMenu = ({ routes }) => {
  const dropdownRoutes = Object.values(routes);
  return (
    <nav className="dropdown-menu">
      <ul>
        {
          dropdownRoutes.map(({ title, route, dropdown, active }) => {
            const activeDropdown = dropdown.length > 0;
            if (active === false) return null;
            return (
              <li
                key={`route-${title}`}
                className={activeDropdown ? 'dropdown-item-has-children' : ''}
              >
                <Link to={route}>
                  { title }
                  { activeDropdown ? <KeyboardArrowDownIcon /> : null }
                </Link>

                {
                  activeDropdown
                    ? (<DropdownMenuItem dropdown={dropdown} />)
                    : null
                }
              </li>
            );
          })
        }
      </ul>
    </nav>
  );
};

export default DropdownMenu;
