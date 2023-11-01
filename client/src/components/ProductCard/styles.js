export const stylesButton = {
  p: '10px',
  borderRadius: '16px',
  fontSize: { mobile: '14px', tablet: '18px' },
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease',
  '&:hover': {
    backgroundColor: 'primary.hover',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
    color: 'text.primaryLight',
    border: '1px solid #664FFF',
  },
  '&:active': {
    backgroundColor: 'common.white',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
    color: 'primary.main',
    border: '1px solid',
  },
};

export const stylesButtonCardOutline = {
  ...stylesButton,
  border: '1px solid',
  color: 'text.header',
  display: 'flex',
  gap: 1,
};

export const stylesButtonCard = {
  ...stylesButton,
  border: '1px solid primary.main',
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
  borderRadius: '16px',
  width: {
    mobile: '100%',
    desktop: '50%',
  },
  maxWidth: {
    tablet: '75%',
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
    tablet: 'flex-start',
    desktop: 'space-between',
  },
  alignItems: 'center',
  gap: {
    mobile: 4,
    tablet: 8,
    desktop: 7,
  },
  mb: { desktop: 4 },
};

export const stylesLabelCard = {
  flexDirection: {
    mobile: 'column',
    lgTablet: 'row',
    desktop: 'column',
  },
  justifyContent: 'space-between',
};

export const stylesPriceCard = {
  display: 'flex',
  justifyContent: {
    mobile: 'flex-end',
    desktop: 'flex-start',
  },
  my: 3,
};

export const stylesActionsCard = {
  justifyContent: {
    mobile: 'space-between',
    tablet: 'flex-end',
    desktop: 'flex-start',
  },
  gap: {
    mobile: 0,
    tablet: '20px',
    desktop: '10%',
  },
  p: 0,
  pb: 1,
};
