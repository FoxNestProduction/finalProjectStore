import { createTheme } from '@mui/material/styles';

const globalTheme = createTheme({
  breakpoints: {
    values: {
      zero: 0,
      mobile: 320,
      tablet: 481,
      desktop: 993,
    },
  },
  palette: {
    primary: {
      main: '#6C5FBC',
      hover: '#664FFF',
    },
    secondary: {
      main: '#FF9140',
      hover: '#FF7C1C',
    },
    text: {
      primary: '#2B2B2B',
      secondary: '#676767',
      primaryLight: '#F9F9F9',
      secondaryLight: '#DBD9EE',
      header: '#606060',
    },
    background: {
      paper: '#FFF',
      default: '#F9F9F9',
      footer: '#EAEAEA',
    },
    healthy: '#DAA31A',
    trending: '#FB471D',
    supreme: '#309D5B',
    bgHealthy: '#F7EDD0',
    bgTrending: '#F7C5BA',
    bgSupreme: '#33AC64',
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    body1: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 400,
    },
    body2: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 400,
    },
    button: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500,
    },
    caption: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 500,
    },
    h1: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 500,
    },
    h2: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 500,
    },
    h3: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 500,
    },
    subtitle1: {
      fontFamily: 'Inter, sans-serif',
    },
    subtitle2: {
      fontFamily: 'Inter, sans-serif',
    },
    // fontInter: 'Inter, sans-serif',
    // fontFamily: 'Poppins, sans-serif',
    // fontWeightSemiBold: 600,
    // fontWeightExtraBold: 800,
    // fontSize: 14,
    // fontWeightLight: 300,
    // fontWeightRegular: 400,
    // fontWeightMedium: 500,
    // fontWeightBold: 700,
  },
  button: {
    large: {
      height: '76px',
    },
    medium: {
      height: '60px',
    },
    small: {
      height: '46px',
    },
    extraSmall: {
      height: '35px',
    },
  },
  components: {
    // MuiButton: {
    //   defaultProps: {
    //     disableRipple: true,
    //   },
    // },
    MuiFormControl: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fieldset: {
            border: '1px solid #6C5FBC',
            borderRadius: '16px',
          },
          input: {
            '&::placeholder': {
              color: '#000',
              opacity: '0.8',
            },
          },
          textarea: {
            '&::placeholder': {
              color: '#000',
              opacity: '0.8',
            },
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: ({ theme }) => ({
          [theme.breakpoints.up('zero')]: {
            paddingRight: '30px',
            paddingLeft: '30px',
          },
          [theme.breakpoints.up('tablet')]: {
            paddingRight: '65px',
            paddingLeft: '65px',
          },
          [theme.breakpoints.up('desktop')]: {
            paddingRight: '90px',
            paddingLeft: '90px',
          },
          maxWidth: '1426px',
        }),
      },
    },
  },
});

console.log(globalTheme);

export default globalTheme;
