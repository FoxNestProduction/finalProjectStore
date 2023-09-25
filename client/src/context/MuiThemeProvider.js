import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';

const MuiThemeProvider = ({ children }) => {
  const theme = createTheme({
    breakpoints: {
      // keys: {
      //   0: 'zero',
      //   1: 'mobile',
      //   2: 'tablet',
      //   3: 'desktop',
      //   4: 'screen',
      // },
      values: {
        zero: 0,
        mobile: 320,
        tablet: 481,
        desktop: 993,
        screen: 1200,
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
      common: {
        white: '#F9F9F9',
      },
      text: {
        primary: '#2B2B2B',
        secondary: '#2B2B2B',
        header: '#606060',
        footer: '#969696',
      },
      background: {
        paper: '#F9F9F9',
        default: '#EFEFEF',
      },
      healthy: '#DAA31A',
      trending: '#FB471D',
      supreme: '#309D5B',
      bgHealthy: '#F7EDD0',
      bgTrending: '#F7C5BA',
      bgSupreme: '#33AC64',
    },
    shape: {
      borderRadius: 12,
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
        color: '#201F1F',
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 500,
      },
      h2: {
        color: '#323142',
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 500,
      },
      h3: {
        color: '#2B2B2B',
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
      MuiFormControl: {
        styleOverrides: {
          root: {
            // background: '#F9F9F9',
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
      chip: {
        width: 78,
        height: 24,
        borderRadius: 8,
        paddingTop: '10px',
        paddingLeft: '32px',
        marginRight: '10px',
      },
    },
  });

  console.log(theme);

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

export default MuiThemeProvider;

MuiThemeProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
