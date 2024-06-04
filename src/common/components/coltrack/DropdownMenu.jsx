import React, { useState } from 'react';
import './DropdownMenu.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';

const DropdownMenuItem = ({ dropdown, toggleDropdown }) => (
  <section className="sub-menu">
    <ul className="list-item" data-children-count={dropdown.length > 12}>
      {dropdown.map(({ title, route, icon, active }) => (
        active === false ? null : (
          <li key={`route-${title}`}>
            <Link to={route} onClick={toggleDropdown}>
              {icon}
              {title}
            </Link>
          </li>
        ))
      )}
    </ul>
  </section>
);

const DropdownMenu = ({ routes }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (title) => () => {
    if (openDropdown === title) {
      setOpenDropdown(null);  // Close if it's already open
    } else {
      setOpenDropdown(title); // Open the clicked dropdown
    }
  };

  const closeDropdown = () => setOpenDropdown(null);

  return (
    <nav className="dropdown-menu">
      <ul>
        {Object.values(routes).map(({ title, route, dropdown, active }) => {
          if (active === false) return null;
          const isOpen = openDropdown === title;
            return (
            <li
              key={`route-${title}`}
              className={isOpen ? 'dropdown-item-has-children open' : 'dropdown-item-has-children'}
            >
              <Link to={route} onClick={toggleDropdown(title)}>
              {title}
              {dropdown.length > 0 ? <KeyboardArrowDownIcon /> : null}
              </Link>
              {isOpen && dropdown.length > 0 ? <DropdownMenuItem dropdown={dropdown} toggleDropdown={closeDropdown} /> : null}
            </li>
            );
        })}
      </ul>
    </nav>
  );
};

export default DropdownMenu;
