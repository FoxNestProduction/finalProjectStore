export const flexCenter = {
  display: 'flex',
  alignItems: 'center',
};

export const restaurantCartItemContainer = {
  border: '1px solid',
  borderColor: 'text.primary',
  borderRadius: '18px',
  p: {
    mobile: '10px 5px',
    tablet: '15px 10px',
    lgTablet: '18px 15px 22px',
    desktop: '20px 20px 30px',
  },
};

export const textContentWrapper = {
  ...flexCenter,
  mb: {
    mobile: '10px',
    tablet: '15px',
    lgTablet: '18px',
    desktop: '20px',
  },
  justifyContent: 'space-between',
};

export const restaurantTitle = {
  color: 'text.primary',
  fontSize: {
    mobile: '16px',
    tablet: '18px',
    lgTablet: '24px',
    desktop: '30px',
  },
  mr: {
    mobile: '10px',
  },
};

export const totalWord = {
  color: 'primary.main',
  fontFamily: 'fontPoppins',
  fontWeight: 'fontWeightSemiBold',
  fontSize: {
    mobile: '16px',
    tablet: '18px',
    lgTablet: '22px',
    desktop: '24px',
  },
  lineHeight: {
    mobile: '1.5em',
  },
  paddingRight: {
    mobile: '6px',
    tablet: '8px',
    desktop: '10px',
  },
};

export const totalPriceFromRestaurantOrderContainer = {
  borderRadius: '16px',
  width: {
    mobile: '80px',
    tablet: '85px',
    lgTablet: '100px',
    desktop: '116px',
  },
  backgroundColor: 'primary.main',
  padding: {
    mobile: '4px 0px',
    tablet: '5px 0px',
    lgTablet: '7px 0px',
    desktop: '9px 0px',
  },
  textAlign: 'center',
};

export const totalPriceFromRestaurantOrder = {
  color: 'text.primaryLight',
  fontWeight: 'fontWeightSemiBold',
  fontSize: {
    mobile: '16px',
    tablet: '18px',
    lgTablet: '20px',
    desktop: '22px',
  },
};

export const cartProductsContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: {
    mobile: '8px',
    tablet: '15px',
    lgTablet: '18px',
    desktop: '22px',
  },
};
