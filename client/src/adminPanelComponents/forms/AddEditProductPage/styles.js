export const flexCenter = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const infoWrapper = {
  display: 'flex',
  flexDirection: {
    mobile: 'column',
    desktop: 'row',
  },
  gap: {
    mobile: '35px',
    desktop: '3%',
  },
};

export const imgContainer = {
  position: 'relative',
  width: '100%',
  borderRadius: '16px',
  overflow: 'hidden',
};

export const productCardImg = {
  border: '1px solid',
  borderColor: 'common.dark',
  minHeight: '250px',
  minWidth: '250px',
  maxHeight: {
    tablet: '300px',
    lgTablet: '350px',
    desktop: '400px',
  },
  width: '100%',
  borderRadius: '16px',
};

export const imgEditBtn = {
  position: 'absolute',
  top: '20px',
  right: 0,
  padding: 0,
};

export const formWrapper = {
  p: '0px',
  width: '100%',
  minWidth: {
    lgTablet: '300px',
  },
};

export const inputsWrapper = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: {
    mobile: '20px;',
    tablet: '30px',
    desktop: '30px',
  },
  mb: {
    mobile: '10px;',
    tablet: '9px',
    desktop: '24px',
  },
  width: '100%',
};

export const submitBtn = {
  width: '188px',
  height: '60px',
  padding: 0,
  alignSelf: 'end',
  color: 'text.primaryLight',
  mb: {
    mobile: '19px',
    tablet: '16px',
    desktop: '24px',
  },
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease',
  '&:hover': {
    backgroundColor: 'primary.hover',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
  },
  '&:active': {
    boxShadow: '0px -1px 4px rgba(0, 0, 0, 0.5)',
    transform: 'translateY(1px)',
    backgroundColor: 'common.white',
    color: '#1C186C',
    boxSizing: 'border-box',
    border: '1px solid',
    borderColor: 'primary.main',
  },
  fontSize: {
    mobile: '14px',
    desktop: '20px',
  },
  fontWeight: {
    mobile: 'fontWeightSemiBold',
    desktop: 'fontWeightRegular',
  },
  textTransform: {
    mobile: 'capitalize',
  },
};

export const input = {
  fontWeight: 'fontWeightMedium',
};

export const checkbox = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
};

export const btnsWrapper = {
  mt: {
    mobile: '20px',
    desktop: '10px',
  },
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  gap: '13%',
};

export const btn = {
  p: '10px 16px',
  width: '100%',
  maxWidth: '190px',
};
