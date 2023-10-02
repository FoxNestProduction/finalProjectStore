export const stylesHeader = {
  bgcolor: 'background.default',
};

export const stylesNav = {
  justifyContent: 'space-between',
  gap: '4vw',
  py: {
    mobile: '18px',
    desktop: '22px',
  },
};

export const stylesNavMenu = {
  pt: {
    tablet: '10px',
    desktop: '8px',
  },
  display: {
    mobile: 'none',
    lgTablet: 'flex',
  },
  flexGrow: 0.5,
  gap: '1vw',
  justifyContent: 'flex-end',
};

export const stylesNavMenuItem = {
  color: 'text.header',
  minWidth: '0',
  fontSize: {
    lgTablet: '13px',
    desktop: '24px',
  },
  fontWeight: 'fontWeightMedium',
  '&:hover': {
    bgcolor: 'rgba(0,0,0,0.04)',
  },
  '&.active': {
    color: 'primary.main',
    bgcolor: 'transparent',
  },
};

export const stylesBurgerButton = {
  display: {
    lgTablet: 'none',
  },
  width: '50px',
  height: '50px',
  mr: '-10px',
};

export const stylesIconsWrapper = {
  display: {
    mobile: 'none',
    lgTablet: 'flex',
  },
  gap: '2vw',
  flexGrow: 2,
  justifyContent: 'flex-end',
};

export const stylesIcon = {
  width: {
    lgTablet: '27px',
    desktop: '34px',
  },
  fontSize: {
    desktop: 30,
  },
};

export const stylesPersonIcon = {
  fontSize: {
    lgTablet: 27,
    desktop: 34,
  },
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
