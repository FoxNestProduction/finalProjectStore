export const actionsStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '10px',
  paddingTop: {
    mobile: '61px',
    tablet: '43px',
  },
};

export const gridStylesContainer = {
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
  cursor: 'pointer',
};

export const gridStylesItemPartners = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: { lgTablet: '49%', desktop: '32%' },
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
};

export const gridStylesItemProducts = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: { lgTablet: '50%', desktop: '50%' },
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
};

export const partnersCardWidth = {
  mobile: 3,
  tablet: 3,
  lgTablet: 2,
  desktop: 3,
};

export const productsCardWidth = {
  mobile: 2,
  tablet: 4,
  lgTablet: 3,
  desktop: 4,
};
