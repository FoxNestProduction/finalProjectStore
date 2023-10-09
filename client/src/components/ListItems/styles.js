export const actionsStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: {
    mobile: '61px',
    tablet: '43px',
  },
};

export const linkStyles = {
  display: 'flex',
  alignItems: 'center',
  borderRadius: '16px',
  backgroundColor: '#F9F9F9',
  padding: '10px',
  color: 'secondary.main',
  gap: '10px',
  border: '1px solid #FF7C1C',
  transition: '.3s',
  '&:hover': {
    backgroundColor: 'secondary.hover',
    border: '1px solid #FF7C1C',
    color: 'text.primaryLight',
    '& svg': {
      fill: '#F9F9F9',
    },
  },
};

export const gridStylesContainer = {
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
};

export const gridStylesItemPartners = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: { lgTablet: '49%', desktop: '32%' },
  transition: 'transform 0.3s',
  cursor: 'pointer',

  // '&:hover': {
  //   transform: 'scale(1.05)',
  // },
};

export const gridStylesItemProducts = {
  display: 'grid',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: { mobile: '48%', tablet: '48%', lgTablet: '50%', desktop: '50%' },
  transition: 'transform 0.3s',
  cursor: 'pointer',

  // '&:hover': {
  //   transform: 'scale(1.05)',
  // },
};

export const partnersCardWidth = {
  mobile: 3,
  tablet: 3,
  lgTablet: 2,
  desktop: 3,
};

export const productsCardWidth = {
  mobile: 4,
  tablet: 4,
  lgTablet: 4,
  desktop: 4,
};
