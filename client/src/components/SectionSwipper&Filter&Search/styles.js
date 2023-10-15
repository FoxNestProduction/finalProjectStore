export const stylesGridConteiner = {
  justifyContent: 'center',
  display: 'grid',
  mb: '40px',
  gridTemplateAreas: {
    mobile: `"a"
    "b"
    "c"`,
    tablet: `"a"
      "b"
      "c"`,
    lgTablet: `"a b"            
    "c b"`,
    desktop: `"a b"              
      "c b"`,
  },
  gridTemplateColumns: {
    mobile: '1fr',
    tablet: '1fr',
    lgTablet: '2.05fr 0.95fr',
  },
  columnGap: {
    mobile: '0',
    tablet: '0',
    lgTablet: '2vw',
    desktop: '3vw',
  },
  rowGap: {
    mobile: '30px',
    tablet: '4vh',
    lgTablet: '0',
  },
  gridTemplateRows: {
    mobile: 'auto',
    tablet: 'auto',
    lgTablet: '2.2fr 0.8fr',
  },
};

export const stylesSwipper = {
  gridArea: 'a',
  alignSelf: 'center',
  overflow: 'hidden',
};

export const stylesFilter = {
  gridArea: 'b',
  alignSelf: 'start',
};

export const stylesSearch = {
  gridArea: 'c',
  alignSelf: 'center',
};
