export const btnStyles = {
  borderRadius: '16px',
  fontSize: {
    tablet: '18px',
    desktop: '24px',
  },
};

export const outlinedBtnStyles = {
  ...btnStyles,
  color: 'primary.main',
  border: '1px solid',
  borderColor: 'primary.main',
  transition: 'background-color 0.3s ease, color 0.3s ease',
  '&:hover': {
    color: { desktop: 'text.primaryLight' },
    backgroundColor: { mobile: 'transparent', desktop: 'primary.hover' },
  },
  '&:active': {
    color: 'text.primaryLight',
    backgroundColor: 'primary.hover',
  },
};

export const containedBtnStyles = {
  ...btnStyles,
  color: 'text.primaryLight',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease',
  '&:hover': {
    backgroundColor: {
      mobile: 'primary.main',
      desktop: 'primary.hover',
    },
    boxShadow: {
      desktop: '0px 4px 6px rgba(0, 0, 0, 0.3)',
    },
  },
  '&:active': {
    boxShadow: '0px -1px 4px rgba(0, 0, 0, 0.5)',
    // transform: 'translateY(1px)',
    backgroundColor: 'common.white',
    color: 'primary.main',
    boxSizing: 'border-box',
    border: '1px solid',
    borderColor: 'primary.main',
  },
};
