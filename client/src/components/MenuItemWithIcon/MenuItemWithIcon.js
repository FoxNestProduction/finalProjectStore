import React, { memo } from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const MenuItemWithIcon = ({ navLink, page, icon, onClick }) => {
  if (navLink) {
    return (
      <ListItem disablePadding>
        <ListItemButton
          sx={{ pl: 3 }}
          component={NavLink}
          to={`/${page.toLowerCase()}`}
        >
          <ListItemIcon sx={{ minWidth: '50px' }}>
            {icon}
          </ListItemIcon>
          <ListItemText
            primary={page}
            sx={{
              '& .MuiTypography-root': {
                fontSize: '18px',
              },
            }}
          />
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <ListItem disablePadding>
      <ListItemButton
        sx={{ pl: 3 }}
        component="button"
        onClick={onClick}
      >
        <ListItemIcon sx={{
          minWidth: '50px',
        }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={page}
          sx={{
            '& .MuiTypography-root': {
              fontSize: '18px',
            },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

MenuItemWithIcon.propTypes = {
  navLink: PropTypes.bool,
  page: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  onClick: PropTypes.func,
};

MenuItemWithIcon.defaultProps = {
  navLink: false,
  onClick: () => {},
};

export default memo(MenuItemWithIcon);
