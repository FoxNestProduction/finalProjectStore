import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';

const MuiThemeProvider = ({ children }) => {
  const theme = createTheme({
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
      MuiContainer: {
        styleOverrides: {
          root: {
            maxWidth: '1426px',
          },
        },
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
