export const stylesSearch = {
  color: 'primary.main',
  bgcolor: 'background.default',
  // '&:hover': {
  //   backgroundColor: (theme) => theme.palette.primary.main,
  // },
  // '&.MuiOutlinedInput-root': {
  //   '&:hover': {
  //     border: (theme) => `1px solid ${theme.palette.primary.main}`,
  //   },
  // },
  width: '100%',
  height: {
    mobile: '51px',
    tablet: '53px',
    desktop: '60px',
  },
};

// export const stylesBorder = {
//   '&:hover': {
//     backgroundColor: (theme) => theme.palette.primary.main,
//   },
//   '&.MuiOutlinedInput-root': {
//     '&:hover': {
//       border: (theme) => `1px solid ${theme.palette.primary.main}`,
//     },
//   },
// };

export const stylesBtn = {
  color: 'primary.main',
  width: '50%',
  bgcolor: 'background.default',
  '&:hover': {
    bgcolor: 'primary.hover',
    color: 'text.primaryLight',
  },
  '&.Mui-selected': {
    '&:hover': {
      bgcolor: 'primary.hover',
      color: 'text.primaryLight',
    },
    color: 'text.primaryLight',
    bgcolor: 'primary.main',
  },
  padding: '16px 24px',
  border: (theme) => `1px solid ${theme.palette.primary.main}`,
  fontFamily: 'fontPoppins',
  fontSize: {
    mobile: '12px',
    tablet: '14px',
    desktop: '24px',
  },
  height: {
    mobile: '51px',
    tablet: '53px',
    desktop: '60px',
  },
};

export const stylesWrap = {
  // width: '200px',
  p: '10px',
  gap: 2,
};
