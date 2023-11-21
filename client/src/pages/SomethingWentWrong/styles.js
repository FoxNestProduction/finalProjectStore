export const root = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  textAlign: 'center',
  p: '20px 30px 30px',
};

export const imgWrapper = {
  height: {
    mobile: '280px',
    lgTablet: '320px',
    desktop: '370px',
  },
  width: {
    mobile: '320px',
    lgTablet: '370px',
    desktop: '420px',
  },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
};

export const mainTitle = {
  fontSize: {
    mobile: '28px',
    lgTablet: '36px',
    desktop: '42px',
  },
  fontWeight: 'fontWeightRegular',
  color: 'text.primary',
  mb: '30px',
};

export const mailLink = {
  color: '#6C5FBC',
  fontWeight: 'fontWeightMedium',
  textDecoration: 'none',
};

export const text = {
  fontSize: {
    mobile: '18px',
    lgTablet: '20px',
    desktop: '22px',
  },
  lineHeight: '2em',
  fontWeight: 'fontWeightRegular',
  letterSpacing: '0.17px',
  color: 'text.primary',
  mb: '40px',
  maxWidth: '605px',
};

export const btnWrapper = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10%',
};

export const btn = {
  fontFamily: 'Poppins, sans-serif',
  textTransform: 'capitalize',
  lineHeight: '1.5em',
  p: '10px',
  borderRadius: '16px',
  fontSize: {
    mobile: '18px',
    lgTablet: '20px',
    desktop: '22px',
  },
  minWidth: {
    mobile: '110px',
    lgTablet: '130px',
    desktop: '150px',
  },
};

export const homeBtn = {
  color: 'text.primary',
  border: 1,
  transition: 'background-color 0.3s ease, color 0.3s ease',
  '&:hover': {
    backgroundColor: 'primary.hover',
    color: 'text.primaryLight',
  },
};

export const reloadBtn = {
  color: 'text.primaryLight',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease',
  '&:hover': {
    backgroundColor: 'primary.hover',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
  },
  '&:active': {
    boxShadow: '0px -1px 4px rgba(0, 0, 0, 0.5)',
    transform: 'translateY(1px)',
    backgroundColor: 'common.white',
    color: '#1C186C',
    border: '1px solid',
    borderColor: 'primary.main',
  },
};
