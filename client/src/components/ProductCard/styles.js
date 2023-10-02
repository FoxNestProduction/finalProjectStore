export const stylesButtonCardOutline = {
  p: '10px',
  borderRadius: '14px',
  color: 'text.primary',
  border: 1,
  fontSize: { mobile: '14px', tablet: '18px' },
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease',
  ':hover': {
    backgroundColor: 'primary.hover',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
    color: 'text.primaryLight',
  },
};

export const stylesSectionCard = {
  bgcolor: 'background.default',
  boxShadow: 'none',
  borderRadius: 0,
  mb: { mobile: '60px', tablet: '100px' },
};

export const stylesHeaderTopCard = {
  pb: 3,
  pt: 0,
  textAlign: 'center',
  display: { desktop: 'none' },
};

export const stylesHeaderInCard = {
  p: 0,
  textAlign: 'start',
  display: {
    mobile: 'none',
    desktop: 'block',
  },
};

export const stylesMediaCard = {
  mb: 3,
  width: {
    mobile: '70%',
    desktop: '40%',
  },
  maxWidth: {
    tablet: '370px',
  },
  height: 'auto',
  objectFit: 'cover',
};

export const stylesContentCard = {
  display: 'flex',
  flexDirection: {
    mobile: 'column',
    desktop: 'row',
  },
  justifyContent: 'center',
  alignItems: 'center',
  gap: { desktop: '3vw' },
};

export const stylesRatingCard = {
  justifyContent: {
    tablet: 'flex-end',
    desktop: 'flex-start',
  },
  gap: {
    mobile: 1,
    tablet: 7,
    desktop: 16,
  },
  mb: { desktop: 4 },
};

export const stylesLabelCard = {
  flexDirection: { mobile: 'row', desktop: 'column' },
  justifyContent: 'space-between',
  gap: '2px',
};

export const stylesPriceCard = {
  display: 'flex',
  justifyContent: {
    mobile: 'flex-end',
    desktop: 'flex-start',
  },
};

export const stylesButtonCard = {
  p: '10px',
  borderRadius: '14px',
  border: 1,
  fontSize: { mobile: '14px', tablet: '18px' },
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease',
  ':hover': {
    backgroundColor: 'primary.hover',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
  },
};

export const stylesActionsCard = {
  justifyContent: {
    mobile: 'space-between',
    tablet: 'flex-end',
    desktop: 'space-between',
  },
  gap: {
    mobile: 0,
    tablet: '20px',
    desktop: 0,
  },
  p: 0,
};
