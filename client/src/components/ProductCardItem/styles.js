import { chipSizeDishes } from '../Chip/styles';

export const stylesFavoriteIcon = {
  position: 'absolute',
  backgroundColor: 'rgba(249, 249, 249, 0.75)',
  borderRadius: '16px',
  margin: '3px',
  height: '30px',
  width: '30px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  right: '0',
  top: '0',
  zIndex: 1050,
  svg: {
    position: 'relative',
    top: '1px',
  },
};

export const stylesImageWrapper = {
  overflow: 'hidden',
};

export const stylesImage = {
  transition: '.3s',
};
export const stylesMiniTextWrapper = {
  margin: {
    mobile: '2px',
    tablet: '4px',
    desktop: '6px',
  },
  width: '60%',
  height: '44px',
  display: 'flex',
  alignItems: 'end',
};
export const stylesMiniText = {
  ...chipSizeDishes,
  mb: '0',
  mt: '2px',
  height: '12px',
  width: '100%',
  fontSize: '10px',
};
const padding = {
  px: {
    mobile: '6px',
    tablet: '10px',
  },
};
export const stylesTitle = {
  ...padding,
  fontSize: {
    mobile: '14px',
    tablet: '18px',
  },
  weight: 600,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  '&:hover': {
    textDecoration: 'underline',
  },
  mb: {
    mobile: '13px',
    tablet: '15px',
    desktop: '15px',
  },
};
export const stylesRatingWrapper = {
  ...padding,
  display: 'flex',
  justifyContent: 'left',
  alignItems: 'center',

  gap: {
    mobile: '3px',
    tablet: '5px',
    desktop: '8px',
  },
  mb: {
    mobile: '26px',
    tablet: '28px',
    desktop: '40px',
  },
};
export const stylesTime = {
  fontSize: {
    mobile: '10px',
    tablet: '12px',
  },
  color: 'text.secondary',
};
export const stylesStarWrapper = {
  display: 'flex',
  gap: '2px',
  pl: '3px',
  pr: '7px',
  alignItems: 'center',
  borderRadius: '6px',
  background: 'rgb(219, 217, 238)',
  svg: {
    position: 'relative',
    top: '-1px',
    left: '-2px',
  },

};
export const stylesPrice = {
  ...padding,
  position: 'relative',
  color: 'text.primaryLight',
  display: 'flex',
  alignItems: 'center',
  mb: '7px',
  gap: '100%',
  backgroundColor: 'primary.main',
  fontSize: { mobile: '16px', tablet: '16px' },
  fontWeight: 700,
};

export const stylesButton = {
  cursor: 'pointer',
  border: '1px solid #2b2b2b',
  position: 'absolute',
  right: '0',
  bottom: '0',
  borderRadius: '16px',
  margin: '4px',
  height: { mobile: '40px', tablet: '40px' },
  width: { mobile: '40px', tablet: '75px' },
  zIndex: 1050,
  backgroundColor: 'background.default',
  '&:hover': {
    backgroundColor: { desktop: 'primary.hover' },
    borderColor: { desktop: 'primary.hover' },
    boxShadow: { desktop: '0px 4px 6px rgba(0, 0, 0, 0.3)' },
    color: { desktop: 'text.primaryLight' },
  },
  '&:active': {
    color: 'primary.main',
    backgroundColor: 'common.white',
    borderColor: 'primary.main',
    border: '1px solid',
  },
};
