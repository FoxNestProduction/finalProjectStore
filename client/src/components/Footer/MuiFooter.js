import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Container,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  Link,
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { NavLink } from 'react-router-dom';
import { stylesLink, stylesWrap, stylesTopWrap, stylesLinkWrap, stylesText, stylesLine, stylesSocial, stylesSocialWrap, stylesTwitter, stylesSizeIcon } from './styles';
import MuiLogo from '../Logo/MuiLogo';

const MuiFooter = () => {
  return (
    <Container direction="column" sx={{ backgroundColor: 'background.footer' }}>
      <AppBar
        elevation={0}
        component="footer"
        position="relativ"
        sx={{
          backgroundColor: 'background.footer',
          minWidth: '260px',
        }}
      >
        <Toolbar sx={{ p: 0 }}>
          <Stack direction="column" sx={stylesWrap}>
            <Stack
              sx={stylesTopWrap}
              direction={{
                zero: 'column',
                mobile: 'column',
                tablet: 'row',
                desktop: 'row',
              }}
            >
              <Link component={NavLink} to="/" sx={{ textDecoration: 'none' }}>
                <MuiLogo />
              </Link>
              <Stack
                direction={{
                  zero: 'column',
                  mobile: 'column',
                  tablet: 'row',
                  desktop: 'row',
                }}
                sx={stylesLinkWrap}
              >
                {/* <Link component={NavLink} to="/Blog" sx={stylesLink}>Blog</Link>
                <Link component={NavLink} to="/Pricing" sx={stylesLink}>Pricing</Link>
                <Link component={NavLink} to="/AboutUs" sx={stylesLink}>About Us</Link>
                <Link component={NavLink} to="/Contact" sx={stylesLink}>Contact</Link> */}
                <Button component={RouterLink} to="/Pricing" sx={stylesLink}>Pricing</Button>
                <Button component={RouterLink} to="/AboutUs" sx={stylesLink}>About Us</Button>
                <Button component={RouterLink} to="/Contact" sx={stylesLink}>Contact</Button>
              </Stack>
            </Stack>
            <Box sx={stylesLine} />
            <Typography component="p" sx={stylesText}>
              © 2023 EATLY All Rights Reserved.
            </Typography>
            <Stack direction="row" sx={stylesSocialWrap}>
              <IconButton href="https://www.instagram.com/" sx={stylesSocial}>
                <InstagramIcon sx={stylesSizeIcon} />
              </IconButton>
              <IconButton href="https://www.linkedin.com/" sx={stylesSocial}>
                <LinkedInIcon sx={stylesSizeIcon} />
              </IconButton>
              <IconButton href="https://uk-ua.facebook.com/" sx={stylesSocial}>
                <FacebookIcon sx={stylesSizeIcon} />
              </IconButton>
              <IconButton href="https://twitter.com/" sx={{ ...stylesSocial, ...stylesTwitter }}>
                <TwitterIcon sx={stylesSizeIcon} />
              </IconButton>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default MuiFooter;
