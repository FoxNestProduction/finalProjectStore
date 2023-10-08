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
  // maxWidth: '500px',
  // border: '1px solid black',
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

export const stylesIconsWrap = {
  display: 'flex',
  justyfyContent: 'row',
  borderRadius: '15px',
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
  // color: 'background.footer',
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
