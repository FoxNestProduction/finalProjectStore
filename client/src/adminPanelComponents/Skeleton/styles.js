export const skeletonWrapper = {
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

export const skeletonImg = {
  width: '100%',
  height: '400px',
  borderRadius: '16px',
  overflow: 'hidden',
  backgroundColor: '#DADADA',
};

export const skeletonFormWrapper = {
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

export const skeletonInput = {
  width: '100%',
  height: '56px',
  borderRadius: '16px',
  backgroundColor: '#DADADA',

  '&:nth-last-child(-n+3)': {
    height: '168px',
  },
};

export const animation = {
  boxShadow: '6px 71px 35px 0px rgba(229, 229, 229, 0.70)',
  background: 'linear-gradient(-75deg, transparent 50%, rgba(92, 78, 174, 1), transparent 80%) 200% 100% / 200% 100%, #EAEAEA',
  animation: 'loading 4s infinite linear',
  backgroundAttachment: 'fixed',

  '@keyframes loading': {
    'to': {
      backgroundPosition: '-200% 0',
    },
  },
};
