const buttonSize = {
  height: {
    zero: '41px',
    mobile: '41px',
    tablet: '47px',
    desktop: '60px',
  },
  width: {
    zero: '110px',
    mobile: '110px',
    tablet: '110px',
    desktop: '188px',
  },
  fontSize: {
    zero: '14px',
    mobile: '14px',
    tablet: '14px',
    desktop: '24px',
  },
};

export const stylesSection = {
  display: 'grid',
  textAlign: {
    zero: 'center',
    mobile: 'center',
    tablet: 'left',
    desktop: 'left',
  },
  marginBottom: {
    zero: '75px',
    mobile: '75px',
    tablet: '60px',
    desktop: '66px',
  },
  gridTemplateColumns: {
    zero: '1fr',
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
    zero: '9px',
    mobile: '9px',
    tablet: '12px',
    desktop: '14px',
  },
  marginBottom: {
    zero: '5px',
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
  // fontSize: {
  //   zero: 'h1.fontSize',
  //   mobile: 'h1.fontSize',
  //   tablet: 'h1.fontSize',
  //   desktop: 'h1.fontSize',
  // },
  marginBottom: {
    zero: '16px',
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
    zero: '17px',
    mobile: '17px',
    tablet: '19px',
    desktop: '36px',
  },
  marginBottom: {
    zero: '41px',
    mobile: '41px',
    tablet: '37px',
    desktop: '32px',
  },
  marginLeft: {
    zero: '10px',
    mobile: '10px',
    tablet: '0',
    desktop: '0',
  },
  marginRight: {
    zero: '10px',
    mobile: '10px',
    tablet: '0',
    desktop: '0',
  },
  fontSize: {
    zero: '12px',
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
    zero: '26px',
    mobile: '26px',
    tablet: '23px',
    desktop: '32px',
  },
  display: 'flex',
  justifyContent: {
    zero: 'center',
    mobile: 'center',
    tablet: 'left',
    desktop: 'left',
  },
  columnGap: {
    zero: '26px',
    mobile: '14px',
    tablet: '12px',
    desktop: '24px',
  },
};

export const stylesStartedBnt = {
  borderRadius: 'shape.borderRadius',
  backgroundColor: 'secondary.main',
  ...buttonSize,
  '&:hover': {
    backgroundColor: 'secondary.hover',
  },
};

export const stylesProBnt = {
  color: 'text.primary',
  borderRadius: 'shape.borderRadius',
  backgroundColor: 'secondary.primaryLight',
  ...buttonSize,
};

export const stylesRating = {
  gridArea: {
    tablet: '5 / 1 / 6 / 2',
    desktop: '5 / 1 / 6 / 2',
  },
  minWidth: '240px',
  marginBottom: {
    zero: '47px',
    mobile: '47px',
  },
  fontFamily: 'Poppins',
  display: 'flex',
  columnGap: '2px',
  justifyContent: {
    zero: 'center',
    mobile: 'center',
    tablet: 'left',
    desktop: 'left',
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
