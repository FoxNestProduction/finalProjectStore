export const btn = {
  background: 'common.white',
  borderRadius: '12px',
  border: '2px solid',
  color: 'text.primary',
  transition: 'border .3s ease, border-color .3s ease, color .3s ease, background-color .3s ease',
};

export const largeBtn = {
  p: '6px 16px',
  minWidth: {
    mobile: '100px',
    lgTablet: '120px',
  },
  fontSize: {
    mobile: '14px',
    lgTablet: '16px',
    desktop: '18px',
  },
};

export const smallBtn = {
  p: '5px 12px',
  minWidth: {
    mobile: '80px',
    lgTablet: '100px',
  },
  fontSize: {
    mobile: '12px',
    lgTablet: '14px',
    desktop: '16px',
  },
};

export const disableBtn = {
  borderColor: 'disable',
  '&:hover': {
    border: '2px solid',
    borderColor: 'disable',
    color: { desktop: 'text.primaryLight' },
    bgcolor: { mobile: 'transparent', desktop: 'disable' },
  },
  '&:active': {
    color: 'text.primaryLight',
    bgcolor: 'disable',
  },
};

export const activateBtn = {
  borderColor: 'activate',
  '&:hover': {
    border: '2px solid',
    borderColor: 'activate',
    color: {
      mobile: 'text.primary',
      desktop: 'text.primaryLight',
    },
    bgcolor: {
      mobile: 'common.white',
      desktop: 'activate',
    },
  },
  '&:active': {
    color: 'text.primaryLight',
    bgcolor: 'activate',
  },
};
