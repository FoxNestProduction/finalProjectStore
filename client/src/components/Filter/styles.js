export const stylesWrap = {
  display: 'flex',
  justyfyContent: 'column',
  fontFamily: 'fontPoppins',
  maxWidth: {
    mobile: '420px',
    tablet: '570px',
    lgTablet: '377px',
    desktop: '377px',
  },
  borderRadius: '17px',
  bgcolor: '#ffffff',
  color: 'text.secondary',
  boxShadow: '6px 10px 28px 1px rgba(108, 95, 188, 0.2)',
  p: {
    mobile: '27px',
    tablet: '23px',
    desktop: '32px',
  },
};

export const stylesWrapTitle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
};

export const stylesTitle = {
  fontSize: {
    mobile: '18px',
    tablet: '15px',
    desktop: '20px',
  },
  fontFamily: 'fontPoppins',
  fontWeight: '600',
  color: '#000000',
};

export const stylesBtnReset = {
  color: 'text.primaryLight',
  bgcolor: 'primary.main',
  fontFamily: 'fontPoppins',
  fontSize: {
    mobile: '12px',
    tablet: '10px',
    desktop: '12px',
  },
  transition: '0.3s ease',
  maxWidth: '50px',
  '.MuiButton-root': {},
  '&:hover': {
    bgcolor: 'primary.hover',
    color: 'text.primaryLight',
    borderColor: 'primary.hover',
  },
};

export const stylesSortBtn = {
  color: 'text.secondaryGray',
  fontWeight: '500',
  fontFamily: 'fontPoppins',
  whiteSpace: 'nowrap',
  transition: 'background-color 0.3s ease',
  fontSize: {
    mobile: '13px',
    tablet: '11px',
    desktop: '16px',
  },
  '&.MuiButtonBase-root': {
    border: '0',
  },
  px: '0',
  '&.Mui-selected': {
    color: 'primary.main',
    bgcolor: '#ffffff',
  },
};

export const stylesCategoryIconsWrap = {
  display: 'flex',
  flexDirection: 'column',
  gap: {
    mobile: '10px',
    tablet: '12px',
    lgTablet: '9px',
    desktop: '13px',
  },
  borderRadius: '15px',
  bgcolor: '#ffffff',
  mt: '20px',
};

export const stylesToggleButton = {
  p: '0',
  width: {
    mobile: '55px',
    tablet: '65px',
    lgTablet: '47px',
    desktop: '66px',
  },
  height: {
    mobile: '80px',
    tablet: '80px',
    lgTablet: '68px',
    desktop: '96px',
  },
  borderRadius: '15px',
  bgcolor: '#FFDE8A',
  '&:hover': {
    bgcolor: { mobile: '#FFDE8A', desktop: '#ffffff' },
    border: { mobile: 'none', desktop: '4px solid rgba(251, 71, 29, 0.50)' },
  },
  '&.Mui-selected': {
    color: '#FB471D',
    bgcolor: '#F7C5BA',
    border: '4px solid rgba(251, 71, 29, 0.50)',
    '&:hover': {
      bgcolor: { mobile: '#F7C5BA', desktop: '#ffffff' },
    },
  },
  transition: 'background-color 0.3s ease, border 0.1s ease',
};

export const stylesCategoryItem = {
  display: 'flex',
  justyfyContent: 'space-around',
  alignItems: 'center',
  gap: {
    mobile: '8px',
    tablet: '7px',
    desktop: '10px',
  },
  '& .MuiCardMedia-root': {
    width: {
      mobile: '29px',
      tablet: '25px',
      desktop: '35px',
    },
    height: {
      mobile: '29px',
      tablet: '25px',
      desktop: '35px',
    },
  },
  '& .MuiTypography-root': {
    fontFamily: 'fontPoppins',
    fontWeight: '500',
    fontSize: {
      mobile: '11px',
      tablet: '9px',
      desktop: '12px',
    },
  },
};

export const stylesSlider = {
  mt: {
    mobile: '15px',
    tablet: '12px',
    desktop: '17px',
  },
  '.MuiSlider-markLabel': {
    fontFamily: 'fontPoppins',
    fontSize: {
      mobile: '12px',
      tablet: '11px',
      desktop: '15px',
    },
  },
  fontWeight: '500',
  '.MuiSlider-valueLabel': {
    fontFamily: 'fontPoppins',
    fontSize: {
      mobile: '12px',
      tablet: '11px',
      desktop: '15px',
    },
    lineHeight: {
      mobile: '14px',
      tablet: '13px',
      desktop: '17px',
    },
    p: '0.25rem 0.5rem',
  },
};

export const stylesBtn = {
  color: 'text.primaryLight',
  bgcolor: 'primary.main',
  fontFamily: 'fontPoppins',
  '.MuiButton-root': {},
  '&:hover': {
    bgcolor: 'primary.hover',
    color: 'text.primaryLight',
    borderColor: 'primary.hover',
  },
  mt: {
    mobile: '32px',
    tablet: '26px',
    desktop: '40px',
  },
};
