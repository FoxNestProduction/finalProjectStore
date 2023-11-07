export const partnersSkeletonStylesContainer = {
  display: 'flex',
  flexDirection: {
    mobile: 'column',
    lgTablet: 'row',
  },
  rowGap: '40px',
  columnGap: '20px',
};

export const productSkeletonStylesContainer = {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: {
    mobile: 'repeat(2, 1fr)',
    lgTablet: 'repeat(3, 1fr)',
    desktop: 'repeat(5, 1fr)',
  },
  gap: '40px 20px',
};
