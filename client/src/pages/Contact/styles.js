export const mainContainer = {
  display: {
    lgTablet: 'flex',
    alignItems: 'stretch',
    gap: '15%',
  },
  pt: {
    mobile: '50px',
    lgTablet: '80px',
    desktop: '100px',
  },
  pb: {
    mobile: '70px',
    lgTablet: '150px',
    desktop: '200px',
  },
};

export const rectWrapper = {
  position: 'relative',
  display: 'flex',
  width: '100%',
};

export const rect = {
  width: '100%',
  ml: {
    lgTablet: '-65px',
    desktop: '-90px',
  },
  height: {
    mobile: '150px',
    lgTablet: '100%',
  },
  p: '10px',
  bgcolor: 'primary.main',
};

export const rectTitleWrapper = {
  position: 'relative',
};

export const title = {
  pt: '24px',
  fontSize: {
    tablet: '32px',
    lgTablet: '28px',
    desktop: '36px',
  },
};

export const doubleLoopArrowWrapper = {
  position: 'absolute',
  bottom: '-90px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: {
    mobile: 'none',
    lgTablet: 'block',
  },
};

export const arrowWrapper = {
  display: {
    mobile: 'block',
    lgTablet: 'none',
  },
};

export const imgMobile = {
  display: {
    mobile: 'none',
    lgTablet: 'block',
  },
  position: 'absolute',
  top: {
    lgTablet: '200px',
    desktop: '170px',
  },
  right: '0',
  transform: 'translateX(25%)',
  width: {
    lgTablet: '220px',
    desktop: '270px',
  },
};
