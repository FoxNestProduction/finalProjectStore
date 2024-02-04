export const btn = {
  backgroundColor: 'common.white',
  borderRadius: '12px',
  border: '2px solid',
  color: 'text.primary',
  transition: 'border .3s ease, border-color .3s ease, color .3s ease, background-color .3s ease',
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
