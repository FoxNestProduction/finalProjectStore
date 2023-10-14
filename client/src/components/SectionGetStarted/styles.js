const buttonSize = {
  height: {
    mobile: '41px',
    tablet: '47px',
    desktop: '60px',
  },
  width: {
    mobile: '110px',
    tablet: '110px',
    desktop: '188px',
  },
  fontSize: {
    mobile: '14px',
    tablet: '14px',
    desktop: '24px',
  },
};

export const stylesSection = {
  display: 'flex',
  flexDirection: { mobile: 'column', tablet: 'row' },
  gap: 1,
  textAlign: {
    mobile: 'center',
    tablet: 'left',
  },
  marginBottom: {
    mobile: '75px',
    tablet: '60px',
    desktop: '66px',
  },
  pt: '40px',
  transition: '.5s',
};

export const stylesTextContainer = {
  display: 'flex',
  flexDirection: 'column',
  width: {
    mobile: '100%',
    tablet: '45%',
    desktop: '52%',
  },
};

export const stylesLabel = {
  color: 'text.secondary',
  fontWeight: 600,
  fontFamily: 'fontPoppins',
  fontSize: {
    mobile: '9px',
    tablet: '12px',
    desktop: '14px',
  },
  marginBottom: {
    mobile: '5px',
    tablet: '12px',
    desktop: '27px',
  },
  opacity: '.7',
};

export const stylesTitle = {
  minWidth: {
    mobile: '100%',
    tablet: '350px',
  },
  color: 'text.primary',
  fontWeight: 500,
  fontFamily: 'fontPoppins',
  marginBottom: {
    mobile: '16px',
    tablet: '11px',
    desktop: '32px',
  },
};

export const stylesDescription = {
  color: 'text.primary',
  fontWeight: 400,
  lineHeight: {
    mobile: '17px',
    tablet: '19px',
    desktop: '36px',
  },
  marginBottom: {
    mobile: '41px',
    tablet: '37px',
    desktop: '32px',
  },
  marginLeft: {
    mobile: '10px',
    tablet: '0',
  },
  marginRight: {
    mobile: '10px',
    tablet: '0',
  },
  fontSize: {
    mobile: '12px',
    tablet: '13px',
    desktop: '24px',
  },
};

export const stylesActions = {
  minWidth: '240px',
  marginBottom: {
    mobile: '26px',
    tablet: '23px',
    desktop: '32px',
  },
  display: 'flex',
  justifyContent: {
    mobile: 'center',
    tablet: 'left',
  },
  columnGap: {
    mobile: '14px',
    tablet: '12px',
    desktop: '24px',
  },
};

export const stylesStartedBnt = {
  backgroundColor: 'secondary.main',
  fontWeight: 500,
  ...buttonSize,
  '&:hover': {
    backgroundColor: 'secondary.hover',
  },
};

export const stylesProBnt = {
  color: 'text.primary',
  borderRadius: 'shape.borderRadius',
  backgroundColor: 'background.default',
  border: '2px solid #6C5FBC',
  fontWeight: 500,
  ...buttonSize,
  '&:hover': {
    color: 'text.primaryLight',
    backgroundColor: 'primary.hover',
  },
};

export const stylesRating = {
  minWidth: '240px',
  marginBottom: {
    mobile: '47px',
  },
  display: 'flex',
  columnGap: '2px',
  justifyContent: {
    mobile: 'center',
    tablet: 'left',
  },
  alignItems: 'center',
};

export const stylesTrustpilot = {
  fontFamily: 'Poppins',
  color: 'text.primary',
  fontWeight: 600,
};

export const stylesStarts = {
  minWeight: '90px',
  fontSize: '20px',
};

export const stylesReviewAmount = {
  color: 'text.secondary',
  fontFamily: 'fontPoppins',
  fontSize: '10px',
  position: 'relative',
  top: '1px',
  opacity: '.7',

};

export const stylesImage = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

};
