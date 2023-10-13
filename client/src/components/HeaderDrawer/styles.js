export const stylesDrawer = {
  display: { zero: 'block', lgTablet: 'none' },
  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '290px' },
};

export const stylesDrawerHeader = {
  display: 'flex',
  justifyContent: 'space-between',
  py: 2,
  px: 3,
};

export const stylesListItem = {
  '& .MuiTypography-root': {
    fontSize: '18px',
  },
};

export const stylesIcon = {
  fontSize: 25,
};

export const stylesBadge = {
  '& .MuiBadge-badge': {
    lgTablet: {
      height: '17px',
      minWidth: '17px',
      px: '5px',
      fontSize: '11px',
    },
    desktop: {
      height: '20px',
      minWidth: '20px',
      px: '6px',
      fontSize: '12px',
      top: '2px',
      right: '2px',
    },
  },
};
