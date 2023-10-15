export const sylesContainer = {
  minHeight: {
    mobile: '246px',
    tablet: '259px',
    desktop: '397px',
  },
  width: {
    mobile: '132px',
    tablet: '169px',
    desktop: '195px',
  },
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '6px 71px 35px 0px rgba(229, 229, 229, 0.70)',

  '&:hover .MuiCardMedia-img': {
    transform: 'scale(1.05)',
  },
};

export const mediaBox = {
  position: 'relative',
  overflow: 'hidden',

};

export const cardMedia = {
  maxHeight: {
    mobile: '126px',
    tablet: '138px',
    desktop: '197px',
  },
  transition: '.3s',
  width: '100%',
};

export const favoriteIcon = {
  position: 'absolute',
  right: '0',
  top: '0',
  zIndex: 1050,
  borderRadius: '50%',
  bgcolor: 'rgba(255, 255, 255, 0.6)',
  '&:hover': {
    bgcolor: 'rgba(102, 79, 255, 0.3)',
  },
};

export const timeRatingBox = {
  display: 'flex',
  alignItems: 'center',
  gap: {
    mobile: '3px',
    tablet: '5px',
    desktop: '8px',
  },
};

export const priceCardBox = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

export const bgRatingBox = {
  display: 'flex',
  gap: '2px',
  pl: '3px',
  pr: '7px',
  alignItems: 'center',
  borderRadius: '6px',
  background: 'rgb(219, 217, 238)',
};

export const chipBox = {
  margin: {
    mobile: '2px',
    tablet: '4px',
    desktop: '8px',
  },
};

export const cartIconsButton = {
  bgcolor: 'none',
  '&:hover': {
    bgcolor: 'rgba(102, 79, 255, 0.2)',
  },
  color: 'text.primary',
};

export const cartIcons = {
  fontSize: {
    mobile: '20px',
    tablet: '25px',
    desktop: '30px',
  },
};
