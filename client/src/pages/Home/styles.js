export const partnersSkeletonStylesContainer = {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: {
    mobile: 'repeat(1, 1fr)',
    lgTablet: 'repeat(2, 1fr)',
    desktop: 'repeat(3, 1fr)',
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
