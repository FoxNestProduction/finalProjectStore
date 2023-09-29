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
  display: 'grid',
  textAlign: {
    mobile: 'center',
    tablet: 'left',
  },
  marginBottom: {
    mobile: '75px',
    tablet: '60px',
    desktop: '66px',
  },
  gridTemplateColumns: {
    mobile: '1fr',
    tablet: '45% 55%',
    desktop: '45% 55%',
  },
  transition: '.5s',
};

export const stylesTextContainer = {
  display: 'flex',
  flexDirection: 'column',
};

export const stylesLabel = {
  gridArea: {
    tablet: '1 / 1 / 2 / 2',
    desktop: '1 / 1 / 2 / 2',
  },
  color: 'text.secondary',
  fontWeight: 600,
  fontFamily: 'Poppins',
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
  gridArea: {
    tablet: '2 / 1 / 3 / 2',
    desktop: '2 / 1 / 3 / 2',
  },
  color: 'text.primary',
  fontWeight: 600,
  fontFamily: 'Poppins',
  marginBottom: {
    mobile: '16px',
    tablet: '11px',
    desktop: '32px',
  },
};

export const stylesDescription = {
  gridArea: {
    tablet: '3 / 1 / 4 / 2',
    desktop: '3 / 1 / 4 / 2',
  },
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
  gridArea: {
    tablet: '4 / 1 / 5 / 2',
    desktop: '4 / 1 / 5 / 2',
  },
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
  borderRadius: 'shape.borderRadius',
  backgroundColor: 'secondary.main',
  fontWeight: 500,
  ...buttonSize,
  '&:hover': {
    backgroundColor: 'secondary.hover',
  },
};

export const stylesProBnt = {
  color: 'text.header',
  borderRadius: 'shape.borderRadius',
  backgroundColor: 'secondary.primaryLight',
  border: '2px solid #000000',
  fontWeight: 500,
  ...buttonSize,
  '&:hover': {
    color: 'text.primaryLight',
    backgroundColor: 'primary.hover',
  },
};

export const stylesRating = {
  gridArea: {
    tablet: '5 / 1 / 6 / 2',
    desktop: '5 / 1 / 6 / 2',
  },
  minWidth: '240px',
  marginBottom: {
    mobile: '47px',
  },
  fontFamily: 'Poppins',
  display: 'flex',
  columnGap: '2px',
  justifyContent: {
    mobile: 'center',
    tablet: 'left',
  },
  alignItems: 'center',
};

export const stylesTrustpilot = {
  color: 'text.primary',
  fontWeight: 600,
};

export const stylesStarts = {
  minWeight: '90px',
  fontSize: '20px',
};

export const stylesReviewAmount = {
  color: 'text.secondary',
  fontSize: '10px',
  position: 'relative',
  top: '1px',
  opacity: '.7',

};

export const stylesImage = {
  gridArea: {
    tablet: '1 / 2 / 6 / 3',
    desktop: '1 / 2 / 6 / 3',
  },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

};
