export const subtitle = {
  mb: '30px',
  color: 'text.primary',
  fontWeight: 'fontWeightMedium',
  fontSize: {
    mobile: '20px',
    tablet: '24px',
    desktop: '26px',
  },
};

export const paymentWrapper = {
  '&.MuiFormControl-root': {
    mt: '18px',
  },
};

export const paymentRadioBtn = {
  '& .MuiTypography-root': {
    fontSize: {
      mobile: 14,
      tablet: 16,
      desktop: 18,
    },
  },
  '& .MuiSvgIcon-root': {
    fontSize: {
      tablet: 25,
    },
  },
};

export const buttonsWrapper = {
  mt: {
    mobile: '55px',
    lgTablet: '65px',
  },
  display: 'flex',
  gap: '5%',
};

export const btn = {
  p: '12px',
  borderRadius: '16px',
  width: '100%',
  fontSize: {
    tablet: '18px',
    desktop: '24px',
  },
};

export const continueBtn = {
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
};

export const backBtn = {
  color: 'text.primary',
  border: 1,
  transition: 'background-color 0.3s ease, color 0.3s ease',
  '&:hover': {
    backgroundColor: 'primary.hover',
    color: 'text.primaryLight',
  },
};
