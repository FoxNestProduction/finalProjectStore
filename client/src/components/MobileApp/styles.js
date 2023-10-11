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
    mobile: '66px',
    tablet: '85px',
    desktop: '70px',
  },
};

export const descriptionBox = {
  display: 'flex',
  alignItems: {
    mobile: 'center',
    tablet: 'flex-start',
  },
  justifyContent: 'center',
  flexDirection: 'column',
  rowGap: {
    mobile: '35px',
    desktop: '45px',
  },
};

export const list = {
  pl: '23px',
  listStyle: 'disc',
  color: 'text.primary',
  display: 'flex',
  flexDirection: 'column',
  rowGap: {
    mobile: '16px',
    teblet: '20px',
    desktop: '32px',
  },
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
  width: '100%',
  display: 'flex',
  flexDirection: {
    mobile: 'column',
    tablet: 'row',
  },
  mb: '25px',
};

export const googleAppleBtn = {
  width: '120px',
  height: '40px',
};

export const arrow = {
  position: 'absolute',
  transform: {
    mobile: 'rotate(97deg)',
    tablet: 'rotate(-20deg)',
  },
  width: {
    mobile: '100px',
    tablet: '110px',
    desktop: '165px',
  },
  bottom: {
    mobile: '-140px',
    tablet: '-30px',
    desktop: '-30px',
  },
  right: {
    mobile: '60%',
    tablet: '-10%',
    lgtablet: '10%',
    desktop: '15%',
  },
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
