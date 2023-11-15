const dishesWraper = {
  display: 'grid',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  gridTemplateColumns: {
    mobile: 'repeat(2, 1fr)',
    lgTablet: 'repeat(3, 1fr)',
    desktop: 'repeat(5, 1fr)',
  },
  columnGap: '20px',
  rowGap: '40px',
};

export default dishesWraper;
