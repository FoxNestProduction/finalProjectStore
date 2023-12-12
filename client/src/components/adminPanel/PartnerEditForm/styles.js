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

export const inputsWrapper = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: {
    mobile: '20px;',
    tablet: '30px',
    desktop: '30px',
  },
  mb: {
    mobile: '10px;',
    tablet: '9px',
    desktop: '24px',
  },
  width: '100%',
};

export const input = {
  fontWeight: '500',
  // fontSize: {
  //   mobile: '16px',
  //   desktop: '24px',
  // },
};

export const btnsWrapper = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  gap: '13%',
};

export const saveBtn = {
  mt: {
    mobile: '20px',
    desktop: '10px',
  },
  p: '10px 16px',
  width: '100%',
  maxWidth: {
    // mobile: '140px',
    // lgTablet: '150px',
    desktop: '160px',
  },
  fontSize: {
    mobile: '16px',
    lgTablet: '18px',
    desktop: '20px',
  },
  color: 'text.primaryLight',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease',
  '&:hover': {
    backgroundColor: {
      mobile: 'primary.main',
      desktop: 'primary.hover',
    },
    boxShadow: {
      desktop: '0px 4px 6px rgba(0, 0, 0, 0.3)',
    },
  },
  '&:active': {
    boxShadow: '0px -1px 4px rgba(0, 0, 0, 0.5)',
    // transform: 'translateY(1px)',
    backgroundColor: 'common.white',
    color: '#1C186C',
    boxSizing: 'border-box',
    border: '1px solid',
    borderColor: 'primary.main',
  },
};
