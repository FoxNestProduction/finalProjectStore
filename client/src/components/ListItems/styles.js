export const actionsStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: {
    mobile: '61px',
    tablet: '43px',
  },
};

export const linkStyles = {
  display: 'flex',
  alignItems: 'center',
  borderRadius: '16px',
  backgroundColor: '#F9F9F9',
  padding: '10px',
  color: 'secondary.main',
  gap: '10px',
  border: '1px solid #FF7C1C',
  transition: '.3s',
  '&:hover': {
    backgroundColor: 'secondary.hover',
    border: '1px solid #FF7C1C',
    color: 'text.primaryLight',
    '& svg': {
      fill: '#F9F9F9',
    },
  },
};

export const gridStylesContainer = {
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'space-between',
  columnGap: '20px',
};

export const gridStylesItemPartners = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: { lgTablet: '48%', desktop: '31%' },
  cursor: 'pointer',
  mb: '40px',
};

export const gridStylesItemProducts = {
  position: 'relative',
  boxShadow: '0 20px 20px 0px rgba(229, 229, 229, 1)',
  '&:hover .MuiCardMedia-img': {
    transform: 'scale(1.05)',
  },
  borderRadius: '16px',
  overflow: 'hidden',
  maxWidth: {
    mobile: '46%',
    tablet: '44%',
    lgTablet: '26%',
    desktop: '16%',
  },
  mb: '40px',
  minWidth: {
    desktop: '145px',
    tablet: '155px',
  },
};

export const stylesSortSelect = {
  color: 'text.primary',
  fontFamily: 'fontPoppins',
  whiteSpace: 'nowrap',
  fontSize: {
    mobile: '15px',
    tablet: '16px',
    desktop: '20px',
  },
  '& .MuiInputBase-input': {
    width: '180px',
    fontFamily: 'fontPoppins',
    color: 'primary.main',
    fontWeight: '600',
    textAlign: 'left',
    pt: '5px',
    pl: '5px',
    borderRadius: '10px',
    fontSize: {
      mobile: '14px',
      tablet: '13px',
      desktop: '16px',
    },
  },
  '& .MuiFormHelperText-root': {
    fontFamily: 'fontPoppins',
    color: 'text.secondary',
  },
  '& .MuiFormLabel-root': {
    fontFamily: 'fontPoppins',
    color: 'primary.main',
  },
};
