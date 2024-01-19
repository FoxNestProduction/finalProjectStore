export const stylesBorder = {
  '& .MuiOutlinedInput-root:hover': {
    '& > fieldset': {
      borderColor: 'primary.hover',
    },
  },
};

export const stylesSearch = {
  color: 'primary.main',
  bgcolor: 'background.default',
  width: '100%',
  minWidth: '260px',
  maxWidth: '593px',
  height: {
    mobile: '51px',
    tablet: '53px',
    desktop: '60px',
  },
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
  py: '40px',
};

export const searchAndButtonsWrapper = {
  display: 'flex',
  width: '100%',
  gap: '24px',
  mb: '34px',
};

export const searchBtn = {
  width: '188px',
  height: '60px',
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
  height: '60px',
  width: '248px',
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
    mobile: '48px',
  },
};

export const cardContainer = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '40px',
  mb: '100px',
};
