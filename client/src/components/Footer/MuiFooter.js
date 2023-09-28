import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { stylesLink, stylesWrap, stylesTopWrap, stylesLinkWrap, stylesText, stylesLine } from './styles';
import MuiLogo from '../Logo/MuiLogo';
// import styles from './footer.module.scss';

const MuiFooter = () => {
  return (
    <Container direction="column">
      <AppBar
        component="footer"
        position="static"
        sx={{
          backgroundColor: 'background.footer',
          minWidth: '320px',
        }}
      >
        <Toolbar>
          <Stack sx={stylesWrap}>
            <Stack sx={stylesTopWrap}>
              <MuiLogo />
              <Stack sx={stylesLinkWrap}>
                <Button sx={stylesLink}>Blog</Button>
                <Button sx={stylesLink}>Pricing</Button>
                <Button sx={stylesLink}>About Us</Button>
                <Button sx={stylesLink}>Contact</Button>
              </Stack>
            </Stack>
            <Box sx={stylesLine} />
            {/* <div className={styles.lineMui}> </div> */}
            <Typography sx={stylesText} component="p">
              © 2023 EATLY All Rights Reserved.
            </Typography>
          </Stack>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default MuiFooter;
