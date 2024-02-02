export const card = {
  maxWidth: '1083px',
  maxHeight: '611px',
  width: '100%',
  padding: '10px 24px 24px 24px',
};
export const cardHeader = {
  p: {
    tablet: '0 0 16px',
    lgTablet: '0 16px 16px 16px',
  },
  position: 'relative',
};

export const cardTitle = {
  fontSize: {
    mobile: '26px',
    tablet: '28px',
    lgTablet: '30px',
    desktop: '38px',
  },
  fontWeight: '500',
  fontFamily: 'fontPoppins',
};

export const disableButton = {
  border: 'none',
  outline: '2px solid #FB471D',
  color: '#000000',
  fontFamily: 'fontFamily',
  fontSize: {
    mobile: '18px',
  },
  px: {
    tablet: '',
    lgTablet: '1em',
    desktop: '1.5em',
  },
  position: {
    tablet: '',
    lgTablet: 'absolute',
    desktop: 'absolute',
  },
  top: '14px',
  right: '0',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
    backgroundColor: 'common.white',
    outline: 'none',
    border: 'none',
  },
  '&:active': {
    boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.2)',
    transform: 'translateY(1px)',
    backgroundColor: '#EAEAEA',
  },
};

export const imgWrapper = {
  position: 'relative',
};

export const disabledCardStyles = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  background: 'rgba(217, 217, 217, 0.60)',
  borderRadius: '16px',
};

export const imgStyles = {
  display: 'block',
  width: '1035px',
  height: '495px',
  borderRadius: '16px',
};
