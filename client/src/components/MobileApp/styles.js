export const flexCenter = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const section = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: {
    mobile: 'center',
    lgTablet: 'space-around',
  },
  flexDirection: {
    mobile: 'column',
    lgTablet: 'row-reverse',
  },
  mb: {
    mobile: '150px',
    desktop: '240px',
  },
};

export const descriptionBox = {
  ...flexCenter,
  flexDirection: 'column',
  rowGap: {
    mobile: '35px',
    tablet: '45px',
    desktop: '140px',
  },
};

export const titleAccent = {
  textTransform: 'capitalize',
  fontWeight: 700,
  color: 'primary.main',
};

export const list = {
  listStyle: 'disc',
  color: 'text.primary',
};

export const listText = {
  fontSize: {
    mobile: '14px',
    tablet: '16px',
    desktop: '24px',
  },
};

export const googleAppleBox = {
  position: 'relative',
  ...flexCenter,
  flexDirection: {
    mobile: 'column',
    tablet: 'row',
  },
};

export const googleAppleBtn = {
  width: '120px',
  height: '40px',
};

export const mobileImg = {
  position: 'relative',
  left: {
    mobile: '15px',
    tablet: '0',
  },
  width: {
    mobile: '170px',
    tablet: '216px',
    desktop: '300px',
  },
  mt: {
    mobile: '110px',
    tablet: '0',
  },
};
