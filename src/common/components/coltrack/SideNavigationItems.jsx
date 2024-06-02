import React, { useState } from 'react';
import {
  Collapse, ListItemButton, ListItemIcon, ListItemText,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

export const SideNavigationSingleLevel = ({
  sub = false,
  closeDrawer,
  selected,
  title,
  route,
  icon,
  active,
}) => (
  active === false ? null : (
    <Link to={route} onClick={closeDrawer}>
      <ListItemButton selected={selected} sx={{ pl: sub ? 5 : 2 }}>
        <ListItemIcon>
          { icon }
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </Link>
  )
);

export const SideNavigationMultiLevel = ({
  closeDrawer, pathname, dropdown, icon, active, title,
}) => {
  if (active === false) return null;

  const [open, setOpen] = useState(false);

  return (
    <div>
      <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemIcon>
          { icon }
        </ListItemIcon>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {
          dropdown.map((props) => (
            <SideNavigationSingleLevel
              key={`multi-single-${props.route}`}
              sub
              closeDrawer={closeDrawer}
              selected={pathname === props.route}
              {...props}
            />
          ))
        }
      </Collapse>
    </div>
  );
};
