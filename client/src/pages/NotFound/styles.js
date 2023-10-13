export const stylesWrapper = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  height: '80vh',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  transition: '.3s',
};

export const stylesStatusWrapper = {
  display: 'flex',
  justifyContent: 'space-around',
  width: '100%',
};
export const stylesStatus = {
  fontSize: {
    mobile: '100px',
    tablet: '140px',
    desktop: '180px',
  },
  color: 'primary.main',
  fontWeight: 'fontWeightSemiBold',
  fontFamily: 'fontPoppins',
  lineHeight: {
    mobile: '64px',
    tablet: '130px',
    desktop: '150px',
  },
  marginBottom: {
    mobile: '40px',
    tablet: '60px',
  },
};

export const stylesDescription = {
  fontSize: {
    mobile: '16px',
    tablet: '20px',
    desktop: '24px',
  },
  color: 'text.primary',
  fontWeight: 'fontWeightSemiBold',
  fontFamily: 'fontPoppins',
  lineHeight: {
    mobile: '24px',
    tablet: '28px',
    desktop: '32px',
  },
  marginBottom: {
    mobile: '47px',
    tablet: '60px',
  },
};

export const stylesLink = {
  backgroundColor: 'primary.main',
  '&:hover': {
    backgroundColor: 'primary.hover',
  },
  '&:active': {
    backgroundColor: 'background.default',
    border: '1px solid #6C5FBC',
    color: 'primary.main',
  },
  height: '60px',
  padding: {
    mobile: '17px 55px',
    tablet: '17px 80px',
    desktop: '17px 100px',
  },
  fontSize: {
    mobile: '16px',
    tablet: '20px',
    desktop: '24px',
  },
  color: 'text.primaryLight',
  fontWeight: 500,
  fontFamily: 'fontPoppins',
  lineHeight: {
    mobile: '16px',
    tablet: '20px',
    desktop: '24px',
  },
};

export const stylesRightArrow = {
  position: 'relative',
  top: '-10%',
  width: '122px',
  display: {
    mobile: 'none',
    tablet: 'block',
  },
  transform: 'scaleX(-1)',
  rotate: '60deg',
};

export const stylesLeftArrow = {
  ...stylesRightArrow,
  transform: 'scale(-1, -1)',
  rotate: '120deg',
};
