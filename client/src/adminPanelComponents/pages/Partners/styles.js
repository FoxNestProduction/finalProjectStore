export const stylesBorder = {
  '& .MuiOutlinedInput-root:hover': {
    '& > fieldset': {
      borderColor: 'primary.hover',
    },
  },
  '& .MuiOutlinedInput-root': {
    height: {
      tablet: 'auto',
      lgTablet: '60px',
    },
  },
};

export const stylesSearch = {
  color: 'primary.main',
  bgcolor: 'background.default',
  width: '100%',
  minWidth: '260px',
  maxWidth: '593px',
};

export const container = {
  textAlign: 'center',
};

export const allContentWrapper = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
};

export const searchButtonsTitleWrapper = {
  maxWidth: '1083px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  p: {
    mobile: '36px 0 20px',
    tablet: '40px 0 28px',
    lgTablet: '40px 0',
  },
};

export const searchAndButtonsWrapper = {
  display: 'flex',
  width: '100%',
  gap: {
    mobile: '12px',
    desktop: '24px',
  },
  mb: {
    mobile: '16px',
    tablet: '22px',
    lgTablet: '34px',
  },
  flexWrap: {
    mobile: 'wrap',
    lgTablet: 'nowrap',
    desktop: 'nowrap',
  },
  justifyContent: {
    mobile: 'space-between',
  },
};

export const searchBtn = {
  width: {
    mobile: '46%',
    tablet: '41%',
    lgTablet: '188px',
  },
  height: {
    mobile: '54px',
    lgTablet: '60px',
  },
  borderRadius: '18px',
  padding: '12px 16px',
  marginRight: '5px',
  fontSize: {
    tablet: '1.1em',
    desktop: '1.3em',
  },
  '@media (min-width: 1212px )': {
    fontSize: '1.5em',
  },
};

export const addPartnersBtn = {
  height: {
    mobile: '54px',
    lgTablet: '60px',
  },
  width: {
    mobile: '46%',
    tablet: '41%',
    lgTablet: '248px',
  },
  padding: '12px 5px',
  fontSize: {
    tablet: '1em',
    desktop: '1.12em',
  },
  '@media (min-width: 1212px )': {
    fontSize: '1.5em',
  },
};

export const title = {
  fontSize: {
    mobile: '36px',
    tablet: '40px',
    lgTablet: '46px',
    desktop: '48px',
  },
};

export const cardContainer = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: {
    mobile: '25px',
    lgTablet: '40px',
  },
  mb: '100px',
};
