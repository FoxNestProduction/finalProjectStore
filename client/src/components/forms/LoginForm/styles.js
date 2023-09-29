export const flexcenter = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export const mainTitle = {
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
  flexDirection: 'row',
  gap: {
    mobile: '17px',
    tablet: '15px',
    desktop: '21px',
  },
  mb: {
    mobile: '27px',
    tablet: '24px',
    desktop: '35px',
  },
};

export const googleAppleBtn = {
  backgroundColor: '#EAEAEA',
  height: '51px',
  width: '148px',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  '@media (min-width: 481px)': {
    width: '130px',
    height: '45px',
  },
  '@media (min-width: 993px)': {
    width: '183px',
    height: '62px',
  },
  '&:hover': {
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
    backgroundColor: 'common.white',
  },
  '&:active': {
    boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.2)',
    transform: 'translateY(1px)',
  },
};

export const legend = {
  color: 'text.secondary',
  fontSize: {
    mobile: '16px',
    tablet: '14px',
    desktop: '24px',
  },
  mb: {
    mobile: '31.6px',
    tablet: '28px',
    desktop: '26px',
  },
  fontWeight: {
    mobile: 500,
    desktop: 400,
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
    desktop: '24px',
  },
  width: {
    mobile: '308px;',
    tablet: '272px',
    desktop: '493px',
  },
};

export const forgetPassword = {
  fontFamily: 'fontFamily',
  fontSize: {
    mobile: '12px',
    tablet: '11px',
    desktop: '16px',
  },
  lineHeight: '1.5em',
  transition: 'color 0.3s ease',
  opacity: '0.7',
  alignSelf: {
    mobile: 'flex-end',
    desktop: 'center',
  },
  mb: {
    mobile: '16px',
    tablet: '14px',
    desktop: '24px',
  },
  ':hover': {
    color: 'primary.hover',
  },
};

export const signInBtn = {
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
  ':hover': {
    backgroundColor: 'primary.hover',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
  },
  '&:active': {
    boxShadow: '0px -1px 4px rgba(0, 0, 0, 0.5)',
    transform: 'translateY(1px)', // під питанням
    backgroundColor: 'common.white',
    color: '#1C186C',
    boxSizing: 'border-box',
    border: '1px solid',
    borderColor: 'primary.main',
  },
  fontSize: {
    mobile: '14px',
    desktop: '24px',
  },
  fontWeight: {
    mobile: 600,
    desktop: 400,
  },
  textTransform: {
    mobile: 'uppercase',
    tablet: 'uppercase',
    desktop: 'capitalize;',
  },
};

export const signUpLink = {
  fontWeight: {
    mobile: 700,
    desktop: 400,
  },
  transition: 'color 0.3s ease',
  '&:hover': {
    color: 'primary.hover',
  },
};
