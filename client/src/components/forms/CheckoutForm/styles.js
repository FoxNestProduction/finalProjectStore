export const title = {
  color: 'text.primary',
  fontSize: {
    mobile: '32px',
    tablet: '40px',
    desktop: '48px',
  },
  maxWidth: {
    lgTablet: '500px',
    desktop: '570px',
  },
  mr: {
    lgTablet: '210px',
    desktop: '270px',
  },
};

export const starsWrapper = {
  display: {
    mobile: 'none',
    lgTablet: 'block',
  },
  position: 'absolute',
  top: '0',
  right: '0',
};

export const inputsWrapper = {
  maxWidth: {
    lgTablet: '500px',
    desktop: '570px',
  },
  m: {
    tablet: '0 auto',
    lgTablet: '0 210px 0 0',
    desktop: '0 270px 0 0',
  },
};

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
  justifyContent: 'space-between',
};

export const btn = {
  p: '12px',
  borderRadius: '16px',
  width: {
    mobile: '140px',
    tablet: '150px',
    desktop: '170px',
  },
  fontSize: {
    tablet: '18px',
    desktop: '24px',
  },
};

export const continueBtn = {
  color: 'text.primaryLight',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  ':hover': {
    backgroundColor: 'primary.hover',
  },
};

export const backBtn = {
  mr: '20px',
  color: 'text.primary',
  border: 1,
  transition: 'background-color 0.3s ease, color 0.3s ease',
  ':hover': {
    backgroundColor: 'primary.hover',
    color: 'text.primaryLight',
  },
};
