export const formWrapper = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  m: { mobile: '40px auto 0', lgTablet: '0' },
  width: '100%',
  minWidth: {
    lgTablet: '260px',
  },
  bgcolor: 'transparent',
};

export const mainTitle = {
  display: {
    mobile: 'none',
    lgTablet: 'block',
  },
  mb: {
    lgTablet: '34px',
    desktop: '27px',
  },
  textAlign: 'center',
  fontWeight: 'fontWeightMedium',
  fontSize: {
    mobile: '26px',
    tablet: '28px',
    lgTablet: '36px',
    desktop: '42px',
  },
  color: 'text.primary',
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
  maxWidth: {
    tablet: '340px',
    lgTablet: '100%',
  },
  mt: '12px',
  height: {
    mobile: '60px',
    tablet: '53px',
    desktop: '60px',
  },
  color: 'text.primaryLight',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease',
  '&:hover': {
    backgroundColor: 'primary.hover',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
  },
  '&:active': {
    boxShadow: '0px -1px 4px rgba(0, 0, 0, 0.5)',
    transform: 'translateY(1px)',
    backgroundColor: 'common.white',
    color: '#1C186C',
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

export const purpleArrow = {
  display: {
    mobile: 'none',
    lgTablet: 'block',
  },
  position: 'absolute',
  bottom: '-20%',
  left: '-22%',
  transform: 'rotate(-78deg)',
};
