const buttonBackToMenu = {
  height: {
    mobile: '41px',
    tablet: '47px',
    desktop: '60px',
  },
  width: {
    mobile: '130px',
    desktop: '208px',
  },
  fontSize: {
    mobile: '14px',
    desktop: '24px',
  },
  fontWeight: 500,
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease',
  '&:hover': {
    backgroundColor: 'primary.hover',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
    color: 'text.primaryLight',
  },
  '&:active': {
    backgroundColor: 'common.white',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
    color: 'primary.main',
    border: '1px solid',
  },
};

export default buttonBackToMenu;
