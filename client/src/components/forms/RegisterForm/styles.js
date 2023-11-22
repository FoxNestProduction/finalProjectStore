export const flexcenter = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const container = {
  m: '0 auto',
  maxWidth: {
    mobile: '100%',
    tablet: 350,
    desktop: 526,
  },
  bgcolor: 'common.white',
  p: {
    desktop: 2,
  },
  flexDirection: 'column',
};

export const mainTitle = {
  fontSize: {
    mobile: '26px',
    tablet: '28px',
    desktop: '36px',
  },
  mb: {
    mobile: '38px',
    tablet: '34px',
    desktop: '27px',
  },
  color: 'text.primary',
  textAlign: 'center',
  fontWeight: {
    mobile: 'fontWeightSemiBold',
    desktop: 'fontWeightMedium',
  },
};

export const googleAppleBtnWrapper = {
  width: '100%',
  gap: {
    mobile: '17px',
    tablet: '15px',
    desktop: '21px',
  },
  mb: {
    mobile: '24px',
    desktop: '35px',
  },
  flexDirection: 'row',
};

export const googleAppleBtn = {
  backgroundColor: '#EAEAEA',
  height: {
    mobile: '51px',
    tablet: '56px',
    desktop: '62px',
  },
  width: '100%',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
    backgroundColor: 'common.white',
  },
  '&:active': {
    boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.2)',
    transform: 'translateY(1px)',
  },
};

export const googleText = {
  color: 'text.secondaryLightGrey',
  ml: '12px',
  fontWeight: 'fontWeightMedium',
  fontSize: {
    mobile: '18px',
    tablet: '20px',
    lgTablet: '22px',
    desktop: '24px',
  },
};

export const appleIcon = {
  color: '#323142',
  fontSize: {
    mobile: '35px',
    tablet: '38px',
    desktop: '45px',
  },
};

export const legend = {
  color: 'text.secondary',
  fontSize: {
    mobile: '12px',
    tablet: '14px',
    desktop: '16px',
  },
  mb: {
    mobile: '24px',
    tablet: '28px',
    desktop: '26px',
  },
  fontWeight: {
    mobile: 'fontWeightMedium',
  },
  lineHeight: '1.5em',
};

export const inputsWrapper = {
  gap: {
    mobile: '20px;',
    tablet: '17px',
    desktop: '24px',
  },
  mb: {
    mobile: '10px;',
    tablet: '9px',
    desktop: '15px',
  },
  width: {
    mobile: '100%;',
    tablet: '350px',
    desktop: '493px',
  },
};

export const signUpBtn = {
  width: '100%',
  color: 'text.primaryLight',
  mb: {
    mobile: '19px',
    tablet: '16px',
    desktop: '24px',
  },
  height: {
    mobile: '60px',
    tablet: '53px',
    desktop: '60px',
  },
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
  textTransform: {
    mobile: 'capitalize',
  },
};

export const signInLink = {
  fontWeight: {
    mobile: 'fontWeightBold',
    desktop: 'fontWeightRegular',
  },
  fontSize: {
    mobile: '13px',
    tablet: '14px',
    desktop: '16px',
  },
  transition: 'color 0.3s ease',
  '&:hover': {
    color: 'primary.hover',
  },
};
