export const mainContainer = {
  display: {
    lgTablet: 'flex',
    alignItems: 'stretch',
    gap: '23%',
  },
  pt: {
    mobile: '50px',
    lgTablet: '100px',
    desktop: '150px',
  },
  pb: {
    mobile: '70px',
    lgTablet: '150px',
    desktop: '200px',
  },
};

export const rectWrapper = {
  position: 'relative',
  display: 'flex',
  width: '100%',
};

export const rect = {
  width: '100%',
  height: {
    mobile: '150px',
    lgTablet: '100%',
  },
  p: '10px',
  bgcolor: 'primary.main',
};

export const rectTitleWrapper = {
  position: 'relative',
};

export const formWrapper = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  m: { mobile: '40px auto 0', lgTablet: '0' },
  width: {
    mobile: '100%',
    tablet: '90%',
    lgTablet: '100%',
  },
  maxWidth: {
    tablet: '380px',
    lgTablet: '100%',
  },
  minWidth: {
    lgTablet: '260px',
  },
  bgcolor: 'transparent',
  flexGrow: 1,
};

export const mainTitle = {
  display: {
    mobile: 'none',
    lgTablet: 'block',
  },
  fontSize: {
    mobile: '26px',
    tablet: '28px',
    lgTablet: '36px',
    desktop: '42px',
  },
  mb: {
    lgTablet: '34px',
    desktop: '27px',
  },
  color: 'text.primary',
  textAlign: 'center',
  fontWeight: 'fontWeightMedium',
};

export const inputsWrapper = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: {
    mobile: '20px;',
    tablet: '17px',
    desktop: '24px',
  },
  mb: {
    mobile: '10px',
    tablet: '9px',
    desktop: '24px',
  },
  width: '100%',
};

export const sendBtn = {
  width: '100%',
  color: 'text.primaryLight',
  mt: '12px',
  mb: {
    mobile: '19px',
    tablet: '16px',
    lgTablet: '0',
  },
  height: {
    mobile: '60px',
    tablet: '53px',
    desktop: '60px',
  },
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease',
  ':hover': {
    backgroundColor: 'primary.hover',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
  },
  '&:active': {
    boxShadow: '0px -1px 4px rgba(0, 0, 0, 0.5)',
    transform: 'translateY(1px)',
    backgroundColor: 'common.white',
    color: '#1C186C',
    boxSizing: 'border-box',
    border: '1px solid',
    borderColor: 'primary.main',
  },
  fontSize: {
    mobile: '14px',
    desktop: '20px',
  },
  fontWeight: {
    mobile: 'fontWeightSemiBold',
    desktop: 'fontWeightRegular',
  },
};
