export const stylesButton = {
  py: {
    lgTablet: '7px',
    desktop: '10px',
  },
  px: {
    lgTablet: '10px',
    desktop: '15px',
  },
  borderRadius: '14px',
  border: '1px solid',
  fontSize: { lgTablet: '14px', desktop: '22px' },
  alineItem: 'flex-end',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease',
  '&:hover': {
    backgroundColor: 'primary.hover',
    borderColor: 'primary.hover',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
    color: 'text.primaryLight',
  },
  '&:active': {
    color: 'primary.main',
    backgroundColor: 'common.white',
    borderColor: 'primary.main',
    border: '1px solid',
  },
};

export const styleCardFavourite = {
  p: '25px',
  height: {
    lgTablet: '180px',
    desktop: '200px',
  },
  display: 'flex',
  justifyContent: 'space-between',
  border: 1,
  borderColor: 'primary.main',
  borderRadius: '18px',
  backgroundColor: 'background.paper',
  position: 'relative',
};

export const styleMediaFavourite = {
  width: 'auto',
  height: {
    lgTablet: '130px',
    desktop: '150px',
  },
  objectFit: 'cover',
  borderRadius: '10px',
  boxShadow: '0 4px 2px #000000A1',
};

export const styleContentFavourite = {
  p: 0,
  minWidth: '32vw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '2%',
};
