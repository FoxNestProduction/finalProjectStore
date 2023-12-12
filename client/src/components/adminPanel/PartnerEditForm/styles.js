import { btnStyles } from '../../../muiTheme/buttonsStyles';

export const mainTitle = {
  fontSize: {
    mobile: '26px',
    tablet: '28px',
    desktop: '36px',
  },
  mb: {
    mobile: '38px',
    tablet: '34px',
    desktop: '27px',
  },
  color: 'text.primary',
  textAlign: 'center',
  fontWeight: {
    mobile: 'fontWeightSemiBold',
    desktop: 'fontWeightMedium',
  },
};

export const inputsWrapper = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
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

export const input = {
  fontWeight: '500',
  // fontSize: {
  //   mobile: '16px',
  //   desktop: '24px',
  // },
};

export const btnsWrapper = {
  mt: {
    mobile: '20px',
    desktop: '10px',
  },
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  gap: '13%',
};

export const btn = {
  ...btnStyles,
  p: '10px 16px',
  width: '100%',
  maxWidth: '190px',
};
