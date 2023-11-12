export const flexCenter = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const container = {
  flexDirection: 'column',
  my: '70px',
};

export const titleContainer = {
  width: '100%',
  display: {
    mobile: 'flex',
    lgTablet: 'grid',
  },
  alignItems: 'center',
  justifyContent: { mobile: 'space-between' },
  mb: '50px',
  gridTemplateColumns: {
    lgTablet: 'repeat(2, 1fr)',
  },
};

export const TitleBtn = {
  backgroundColor: 'primary.main',
  color: 'text.primaryLight',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease',
  ':hover': {
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
  p: {
    mobile: '5px 0',
    lgTablet: '10px',
  },
  justifySelf: 'end',
};

export const commentList = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  rowGap: '20px',
  columnGap: '20px',
};

export const commentItem = {
  width: '100%',
  height: '100%',
  ...flexCenter,
  animation: 'flip 0.6s cubic-bezier(0.455, 0.030, 0.515, 0.955) reverse both, fadeIn 0.7s ease-in',
  opasity: 0,
  '@keyframes flip': {
    '0%': {
      transform: 'translateY(0) translateZ(0) rotateX(0)',
      transformOrigin: '50% 100%',
    },
    '100%': {
      transform: 'translateY(100%) translateZ(160px) rotateX(180deg)',
      transformOrigin: '50% 0%',
    },
  },
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
};
