const scrollingWrapperStyles = {
  display: 'flex',
  gap: '1vw',
  overflowX: 'scroll',
  overflowY: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  height: '100%',
  paddingTop: '82px',
  paddingBottom: '96px',
  width: '100%',
  cursor: 'pointer',
};

const cardStyles = {
  display: 'inline-block',
  width: '100%',
  height: '100%',
};

const scrollbarStyles = {
  WebkitOverflowScrolling: 'touch',
  height: '12px',
};

const scrollbarTrackStyles = {
  background: '#c8c5df',
  borderRadius: '35px',
  marginTop: '70px',
  '@media (min-width: 481px)': {
    mx: '80px',
  },
};

const scrollbarThumbStyles = {
  backgroundColor: 'primary.main',
  width: '10vw',
  borderRadius: '35px',
  border: '3px solid #c8c5df',
};
