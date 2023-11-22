export const stylesSearch = {
  color: 'primary.main',
  bgcolor: 'background.default',
  width: '100%',
  minWidth: '260px',
  height: {
    mobile: '51px',
    tablet: '53px',
    desktop: '60px',
  },
};

export const stylesBorder = {
  '& .MuiOutlinedInput-root:hover': {
    '& > fieldset': {
      borderColor: 'primary.hover',
    },
  },
};

export const stylesBtn = {
  color: 'primary.main',
  width: '50%',
  bgcolor: 'background.default',
  '&:hover': {
    bgcolor: 'primary.hover',
    color: 'text.primaryLight',
    borderColor: 'primary.hover',
  },
  '&.Mui-selected': {
    '&:hover': {
      bgcolor: 'primary.hover',
      color: 'text.primaryLight',
    },
    color: 'text.primaryLight',
    bgcolor: 'primary.main',
  },
  padding: '16px 24px',
  border: (theme) => `1px solid ${theme.palette.primary.main}`,
  fontFamily: 'fontPoppins',
  fontSize: {
    mobile: '12px',
    tablet: '14px',
    desktop: '24px',
  },
  height: {
    mobile: '51px',
    tablet: '53px',
    desktop: '60px',
  },
};

export const stylesWrap = {
  gap: 2,
  width: {
    mobile: '100%',
    tablet: '100%',
  },
  minWidth: '260px',
};
