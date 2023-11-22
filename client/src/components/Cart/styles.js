export const mainBox = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: {
    mobile: 'center',
  },
};

export const title = {
  fontWeight: {
    mobile: 'fontWeightSemiBold',
    desktop: 'fontWeightMedium',
  },
  alignSelf: {
    mobile: 'center',
    tablet: 'flex-start',
  },
  color: 'text.primary',
  mb: {
    mobile: '22px',
    tablet: '86px',
    desktop: '26px',
  },
};

export const cartProductsContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: {
    mobile: '24px',
    tablet: '30px',
  },
  mb: {
    mobile: '24px',
    tablet: '85px',
    desktop: '40px',
  },
};

export const continueShoppingBtn = {
  mb: '24px',
  height: {
    mobile: '46px',
    tablet: '56px',
    lgTablet: '60px',
    desktop: '62px',
  },
  fontSize: {
    mobile: '18px',
    tablet: '22px',
    lgTablet: '24px',
  },
  fontWeight: 'fontWeightMedium',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease',
  color: 'primary.main',
  '&:hover': {
    backgroundColor: 'primary.hover',
    color: 'text.primaryLight',
    boxShadow: `
    0px 2px 4px -1px rgba(0,0,0,0.2),
    0px 4px 5px 0px rgba(0,0,0,0.14),
    0px 1px 10px 0px rgba(0,0,0,0.12)`,
  },
  '&:active': {
    boxShadow: `
    0px 5px 5px -3px rgba(0,0,0,0.2),
    0px 8px 10px 1px rgba(0,0,0,0.14),
    0px 3px 14px 2px rgba(0,0,0,0.12)`,
    transform: 'translateY(1px)',
    backgroundColor: 'common.white',
    color: '#1C186C',
    boxSizing: 'border-box',
    border: '1px solid',
    borderColor: 'primary.main',
  },
  alignSelf: {
    lgTablet: 'flex-start',
  },
};

export const priceAndContBtnWrapper = {
  display: 'flex',
  flexDirection: {
    mobile: 'column',
    lgTablet: 'row',
  },
  alignItems: 'center',
  width: '100%',
  mb: '200px',
  gap: {
    lgTablet: '32px',
    desktop: '24px',
  },
};

export const textAndPriceWrapper = {
  display: 'flex',
  justifyContent: {
    mobile: 'space-between',
    lgTablet: 'flex-start',
  },
  alignItems: {
    mobile: 'center',
    lgTablet: 'flex-start',
  },
  width: {
    mobile: '100%',
    lgTablet: '79%',
  },
  mb: {
    mobile: '24px',
    lgTablet: '0px',
  },
  gap: {
    lgTablet: '7%',
    desktop: '80px',
  },
};

export const deliveryTypography = {
  fontSize: {
    mobile: '18px',
    tablet: '26px',
    lgTablet: '30px',
    desktop: '38px',
  },
  fontWeight: {
    mobile: 'fontWeightSemiBold',
    desktop: 'fontWeightMedium',
  },
  color: 'text.primary',
  fontFamily: 'fontPoppins',
  flex: {
    lgTablet: '1 1 15%',
    desktop: '0',
  },
};

export const freeTypography = {
  fontWeight: 'fontWeightSemiBold',
  fontFamily: 'fontPoppins',
  color: 'secondary.main',
  flex: {
    lgTablet: '1 1 20%',
  },
  fontSize: {
    mobile: '16px',
    tablet: '22px',
    lgTablet: '24px',
  },
  lineHeight: '1.5em',
};

export const priceWrapper = {
  width: {
    mobile: 'max-content',
    tablet: '130px',
    lgTablet: '155px',
  },
  border: {
    tablet: '1px solid',
  },
  borderColor: {
    tablet: 'text.primary',
  },
  borderRadius: '16px',
};

export const price = {
  color: 'text.primary',
  fontFamily: 'fontPoppins',
  fontWeight: {
    mobile: 'fontWeightBold',
    desktop: 'fontWeightSemiBold',
  },
  fontSize: {
    mobile: '18px',
    tablet: '22px',
    lgTablet: '24px',
  },
  textAlign: 'center',
  p: {
    tablet: '11px 0px',
    lgTablet: '12px 0px',
    desktop: '13px 0px',
  },
};

export const continueBtn = {
  width: {
    mobile: '100%',
    tablet: '170px',
    desktop: '172px',
  },
  height: {
    mobile: '46px',
    tablet: '56px',
    lgTablet: '60px',
    desktop: '62px',
  },
  fontSize: {
    mobile: '18px',
    tablet: '22px',
    lgTablet: '24px',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease',
  },
  color: 'text.primaryLight',
  fontWeight: {
    mobile: 'fontWeightBold',
    desktop: 'fontWeightMedium',
  },
  '&:hover': {
    backgroundColor: 'primary.hover',
  },
  '&:active': {
    transform: 'translateY(1px)',
    backgroundColor: 'common.white',
    color: '#1C186C',
    boxSizing: 'border-box',
    border: '1px solid',
    borderColor: 'primary.main',
  },
};
