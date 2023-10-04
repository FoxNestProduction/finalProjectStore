import React from 'react';
import { AppBar, Box, Container, IconButton, Stack, Toolbar, Typography, Link } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { NavLink } from 'react-router-dom';
import { stylesLink, stylesWrap, stylesTopWrap, stylesLinkWrap, stylesText, stylesLine, stylesSocial, stylesSocialWrap, stylesSizeIcon } from './styles';
import Logo from '../Logo/Logo';

const Footer = () => {
  return (
    <AppBar
      elevation={0}
      component="footer"
      position="relative"
      sx={{
        backgroundColor: 'background.footer',
        minWidth: '260px',
      }}
    >
      <Container direction="column">
        <Toolbar sx={{ p: 0 }}>
          <Stack direction="column" sx={stylesWrap}>
            <Stack
              sx={stylesTopWrap}
              direction={{
                mobile: 'column',
                tablet: 'row',
              }}
            >
              <Link component={NavLink} to="/" sx={{ textDecoration: 'none' }}>
                <Logo type="footer" />
              </Link>
              <Stack
                direction={{
                  mobile: 'column',
                  tablet: 'row',
                }}
                sx={stylesLinkWrap}
              >
                <Link component={NavLink} to="/Reviews" sx={stylesLink}>
                  Reviews
                </Link>
                <Link component={NavLink} to="/Pricing" sx={stylesLink}>
                  Pricing
                </Link>
                <Link component={NavLink} to="/AboutUs" sx={stylesLink}>
                  About Us
                </Link>
                <Link component={NavLink} to="/Contact" sx={stylesLink}>
                  Contact
                </Link>
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
              <IconButton href="https://twitter.com/" sx={stylesSocial}>
                <TwitterIcon sx={stylesSizeIcon} />
              </IconButton>
            </Stack>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
