export const stylesWrap = {
  display: 'flex',
  justyfyContent: 'column',
  fontFamily: 'fontPoppins',
  width: {
    mobile: '316px',
    tablet: '268px',
    desktop: '377px',
  },
  borderRadius: '17px',
  bgcolor: '#ffffff',
  color: 'text.secondary',
  p: {
    mobile: '27px',
    tablet: '23px',
    desktop: '32px',
  },
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

export const stylesSortBtn = {
  color: 'text.secondaryGray',
  fontWeight: '500',
  fontFamily: 'fontPoppins',
  whiteSpace: 'nowrap',
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
  justyfyContent: 'column',
  gap: {
    mobile: '10px',
    tablet: '9px',
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
    tablet: '47px',
    desktop: '66px',
  },
  height: {
    mobile: '80px',
    tablet: '68px',
    desktop: '96px',
  },
  borderRadius: '15px',
  bgcolor: '#FFDE8A',
  '&:hover': {
    bgcolor: '#ffffff',
    border: '4px solid rgba(251, 71, 29, 0.50)',
  },
  '&.Mui-selected': {
    color: '#FB471D',
    bgcolor: '#F7C5BA',
    border: '4px solid rgba(251, 71, 29, 0.50)',
    '&:hover': {
      bgcolor: '#ffffff',
      // border: '4px solid rgba(251, 71, 29, 0.50)',
    },
  },
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
  fontSize: {
    mobile: '9px',
    tablet: '8px',
    desktop: '11px',
  },
  '.MuiSlider-markLabel': {
    fontFamily: 'fontPoppins',
  },
  fontWeight: '500',
  '.MuiSlider-valueLabel': {
    fontFamily: 'fontPoppins',
    fontSize: '7px',
    lineHeight: '12px',
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
