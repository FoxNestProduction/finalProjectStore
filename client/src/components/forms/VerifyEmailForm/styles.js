export const flexcenter = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
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
  fontWeight: 'fontWeightMedium',
  lineHeight: '1.5em',
};

export const inputsWrapper = {
  mb: {
    mobile: '10px;',
    tablet: '9px',
    desktop: '24px',
  },
  width: {
    mobile: '100%;',
    tablet: '350px',
    desktop: '493px',
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
  '&:hover': {
    backgroundColor: 'primary.hover',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
  },
  '&:active': {
    boxShadow: '0px -1px 4px rgba(0, 0, 0, 0.5)',
    transform: 'translateY(1px)',
    backgroundColor: 'common.white',
    color: 'primary.main',
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
