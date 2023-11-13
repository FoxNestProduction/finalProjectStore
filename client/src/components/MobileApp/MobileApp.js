import { Divider, Box, Button, Container, List, ListItem, Typography } from '@mui/material';
import React from 'react';
import { section, descriptionBox, list, listText, googleAppleBtn, googleAppleBox, arrow, mobileImg } from './styles';

const MobileApp = () => {
  const onClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <>
      <Container
        component="section"
        sx={section}
      >
        <Box sx={descriptionBox}>
          <Typography component="h2" variant="h2" sx={{ color: 'text.primary' }} textTransform="capitalize" fontWeight={500}>
            Premium Quality
            <br />
            For Your Health
          </Typography>
          <List sx={list}>
            <ListItem sx={{ display: 'list-item', padding: '0' }}>
              <Typography component="p" variant="subtitle1" sx={listText}>
                Premium quality food is made with ingredients that
                <br />
                are packed with essential vitamins, minerals.
              </Typography>
            </ListItem>
            <ListItem sx={{ display: 'list-item', padding: '0' }}>
              <Typography component="p" variant="subtitle1" sx={listText}>
                These foods promote overall wellness by
                <br />
                support healthy digestion and boosting immunity
              </Typography>
            </ListItem>
          </List>
          <Box sx={googleAppleBox}>
            <Button sx={{ padding: '0' }} onClick={() => onClick('https://play.google.com/')}>
              <Box
                component="img"
                src={`${process.env.PUBLIC_URL}/img/google-play.png`}
                alt="google play"
                sx={googleAppleBtn}
              />
            </Button>
            <Button sx={{ padding: '0' }} onClick={() => onClick('https://www.apple.com/ua/app-store/')}>
              <Box
                component="img"
                src={`${process.env.PUBLIC_URL}/img/app-store.png`}
                alt="google play"
                sx={googleAppleBtn}
              />
            </Button>
            {/* <Box sx={arrow}><DoubleLoopArrow /></Box> */}
          </Box>
        </Box>
        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}/img/layout/mobile.png`}
          alt="phone"
          sx={mobileImg}
        />
      </Container>
      <Container>
        <Divider sx={{ marginBottom: { desktop: '120px', tablet: '70px', mobile: '80px' } }} />
        {/* Додає сіру лінію під секцією довжина якої регул. котейнером */}
      </Container>
    </>
  );
};

export default MobileApp;
