import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { root, imgWrapper, mainTitle, mailLink, text, btnWrapper, btn, reloadBtn, homeBtn } from './styles';
import { ReactComponent as GirlFalls } from '../../assets/svg/smthWrong.svg';

const SomethingWentWrong = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <Box component="div" sx={root}>
      <Box sx={imgWrapper}>
        <GirlFalls />
      </Box>

      <Typography sx={mainTitle} variant="h3" component="h1">
        Oops... Something went wrong!
      </Typography>
      <Typography sx={text} variant="h4" component="p">
        Please either refresh the page or return home to try again.
        {' '}
        If the issue continues, please
        {' '}
        <Link href="mailto:eatly.supp@gmail.com" sx={mailLink}>
          get in touch.
        </Link>
      </Typography>
      <Box sx={btnWrapper}>
        <Button
          variant="outlined"
          component="a"
          href="/"
          sx={{ ...btn, ...homeBtn }}
          disableRipple
        >
          Go Home
        </Button>
        <Button
          type="button"
          variant="contained"
          sx={{ ...btn, ...reloadBtn }}
          onClick={handleReload}
          disableRipple
        >
          Reload
        </Button>
      </Box>
    </Box>
  );
};

export default SomethingWentWrong;
