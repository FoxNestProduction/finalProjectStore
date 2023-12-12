export const card = {
  m: '0 auto',
  p: '24px',
  maxWidth: '1083px',
  borderRadius: '16px',
  // background: '#fdf3f3',
  // border: '1px solid red',
  boxShadow: '7.572px 90.862px 45.431px 0px rgba(229, 229, 229, 0.70)',
};

export const toggleDisableBtn = {
  background: '#FFF',
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
  borderRadius: '12px',
  border: '2px solid',
  color: 'text.primary',
  transition: 'border .3s ease, border-color .3s ease, color .3s ease, background-color .3s ease',
  // '&:hover': {
  //   border: '2px solid',
  //   borderColor: 'disable',
  //   color: {
  //     mobile: 'text.primary',
  //     desktop: 'text.primaryLight',
  //   },
  //   bgcolor: {
  //     mobile: 'common.white',
  //     desktop: 'disable',
  //   },
  // },
  // '&:active': {
  //   color: {
  //     mobile: 'text.primaryLight',
  //     desktop: 'text.primary',
  //   },
  //   bgcolor: {
  //     mobile: 'disable',
  //     desktop: 'common.white',
  //   },
  // },
  // '&:active': {
  //   color: 'text.primaryLight',
  //   bgcolor: 'disable',
  // },
};

export const disableBtn = {
  borderColor: 'disable',
  '&:hover': {
    border: '2px solid',
    borderColor: 'disable',
    color: {
      mobile: 'text.primary',
      desktop: 'text.primaryLight',
    },
    bgcolor: {
      mobile: 'common.white',
      desktop: 'disable',
    },
  },
  // '&:active': {
  //   bgcolor: {
  //     mobile: 'disable',
  //   },
  // },
  '&:active': {
    color: 'text.primaryLight',
    bgcolor: 'disable',
  },
};

export const activateBtn = {
  borderColor: 'activate',
  '&:hover': {
    border: '2px solid',
    borderColor: 'activate',
    color: {
      mobile: 'text.primary',
      desktop: 'text.primaryLight',
    },
    bgcolor: {
      mobile: 'common.white',
      desktop: 'activate',
    },
  },
  '&:active': {
    color: 'text.primaryLight',
    bgcolor: 'activate',
  },
};

// ------- 1 варіант ------

// export const infoWrapper = {
//   display: 'flex',
//   flexDirection: {
//     mobile: 'column',
//     desktop: 'row',
//   },
//   gap: {
//     mobile: '35px',
//     desktop: '3%',
//   },
// };
//
// export const cardImgWrapper = {
//   width: '100%',
//   maxHeight: '500px',
//   borderRadius: '16px',
//   overflow: 'hidden',
// };
//
// export const cardImg = {
//   width: '100%',
//   borderRadius: '16px',
// };

// ------- 1 варіант кінець ------

// ------- 2 варіант ------

export const infoWrapper = {
  display: 'flex',
  flexDirection: {
    mobile: 'column',
    lgTablet: 'row',
  },
  gap: {
    mobile: '35px',
    lgTablet: '3%',
  },
};

export const cardImgWrapper = {
  width: '100%',
  borderRadius: '16px',
};

export const cardImg = {
  width: '100%',
  borderRadius: '16px',
};

// ------- 2 варіант кінець ------

export const formWrapper = {
  p: '0px',
  width: '100%',
  minWidth: {
    lgTablet: '300px',
  },
};
