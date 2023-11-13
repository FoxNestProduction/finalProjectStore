export const flexCenter = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const featuresBG = {
  backgroundImage: {
    mobile: 'url(./img/FeaturesMobileBG.png)',
    tablet: 'url(./img/FeaturesTabletBG.png)',
  },
  backgroundSize: 'cover',
  width: '100%',
};

export const featuresContainer = {
  display: 'flex',
  flexDirection: {
    mobile: 'column',
    tablet: 'row',
  },
  alignItems: 'center',
  justifyContent: 'space-between',
  height: {
    mobile: '748px',
    tablet: '160px',
    desktop: '220px',
  },
  p: {
    mobile: '100px 0',
    tablet: '40px 0',
    desktop: '56px 0',
  },
  mb: {
    mobile: '67px',
    tablet: '85px',
    desktop: '115px',
  },
};

export const itemContainer = {
  width: '100%',
  flexDirection: 'column',
};

export const itemTitle = {
  fontSize: {
    mobile: '43px',
    tablet: '30px',
    desktop: '40px',
  },
  fontWeight: 700,
  color: 'text.primaryLight',
};

export const descriptionBox = {
  width: '100%',
  flexDirection: 'column',
  color: 'text.secondaryLight',
};

export const description = {
  fontSize: {
    mobile: '14px',
    tablet: '10px',
    desktop: '16px',
  },
};

export const lineBreak = {
  bgcolor: '#CBCBCB',
  opacity: '.15',
  width: {
    mobile: '240px',
    tablet: '1px',
  },
  height: {
    mobile: '1px',
    tablet: '80px',
    desktop: '110px',
  },
};
