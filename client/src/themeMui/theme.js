import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 320,
      tablet: 481,
      desktop: 993,
    },
  },
  palette: {
    primaryDefaultColor: {
      main: '#6C5FBC',
      second: '#FF9140',
    },
    primaryHoverColor: {
      main: '#664FFF',
      second: '#FF7C1C',
    },
    labelColor: {
      healthy: '#DAA31A',
      trending: '#FB471D',
      supreme: '#309D5B',
    },
    textColor: {
      main: '#2B2B2B',
      header: '#606060',
      footer: '#969696',
      title: '#201F1F',
      subTitile: '#323142',
    },
    healthyColor: {
      background: '#F7EDD0',
      text: '#DAA31A',
    },
    trendingColor: {
      background: '#F7C5BA',
      text: '#FB471D',
    },
    supremeColor: {
      background: '#00B67A',
      text: '#309D5B',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontInter: 'Inter, sans-serif',
    fontPoppins: 'Poppins, sans-serif',
    fontWeightSemiBold: 600,
    fontWeightExtraBold: 800,

    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },

  components: {
    chip: {
      width: 78,
      height: 24,
      borderRadius: 8,
      paddingTop: '10px',
      paddingLeft: '32px',
      marginRight: '10px',
    },
  },

  mixins: {

  },

});

export default theme;
