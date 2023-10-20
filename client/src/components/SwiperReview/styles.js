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
  '@media (min-width: 691px)': {
    width: '375px',
  },
  '@media (min-width: 991px)': {
    width: '458px',
  },
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
  '@media (min-width: 691px)': {
    marginLeft: '300px',
  },
};

const scrollbarThumbStyles = {
  backgroundColor: '#6C5FBC',
  width: '20vw',
  borderRadius: '35px',
  border: '3px solid #c8c5df',
};
