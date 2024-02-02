import { outlinedBtnStyles } from '../../../muiTheme/buttonsStyles';

export const card = {
  m: '0 auto',
  p: '24px 24px 50px 24px',
  maxWidth: '1083px',
  borderRadius: '16px',
  boxShadow: '7.572px 90.862px 45.431px 0px rgba(229, 229, 229, 0.70)',
};

export const getCardStyles = (item) => {
  if (item) {
    return ({
      ...card,
      ...(!item?.enabled ? { outline: '2px solid', outlineColor: (theme) => theme.palette.disable } : {}),
    });
  }
  return { ...card,
    p: '50px 24px 50px 24px' };
};

export const topBtnsWrapper = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: {
    mobile: '6%',
    lgTablet: '5%',
    desktop: '4%',
  },
  p: '0',
  mb: '23px',
};

export const disableBtn = {
  p: '6px 16px',
  minWidth: {
    mobile: '100px',
    lgTablet: '120px',
  },
  fontSize: {
    mobile: '14px',
    lgTablet: '16px',
    desktop: '18px',
  },
};

export const showDishesBtnWrapper = {
  justifyContent: 'flex-end',
  p: '0',
  mt: {
    mobile: '20px',
    desktop: '10px',
  },
};

export const showDishesBtn = {
  ...outlinedBtnStyles,
  p: '10px 16px',
  width: '100%',
  maxWidth: { mobile: '150px', tablet: '180px', desktop: '200px' },
};
