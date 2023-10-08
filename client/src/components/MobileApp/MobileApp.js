import { Box, Button, Container, List, ListItem, Typography } from '@mui/material';
import React from 'react';
import { section, descriptionBox, titleAccent, list, listText, googleAppleBtn, googleAppleBox, arrow, mobileImg } from './styles';
import { ReactComponent as DoubleLoopArrow } from './DoubleLoopArrow.svg';

const MobileApp = () => {
  const onClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <Container
      sx={section}
    >
      <Box sx={descriptionBox}>
        <Typography component="h2" variant="h2" textTransform="capitalize" fontWeight={700}>
          Premium
          <Typography component="span" variant="h2" sx={titleAccent}> Quality </Typography>
          <br />
          For Your Health
        </Typography>
        <List sx={list}>
          <ListItem sx={{ display: 'list-item' }}>
            <Typography component="p" variant="subtitle1" sx={listText}>
              Premium quality food is made with ingredients that
              <br />
              are packed with essential vitamins, minerals.
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <Typography component="p" variant="subtitle1" sx={listText}>
              These foods promote overall wellness by
              <br />
              support healthy digestion and boosting immunity
            </Typography>
          </ListItem>
        </List>
        <Box sx={googleAppleBox}>
          <Button onClick={() => onClick('https://play.google.com/')}>
            <Box
              component="img"
              src={`${process.env.PUBLIC_URL}/img/google-play.png`}
              alt="google play"
              sx={googleAppleBtn}
            />
          </Button>
          <Button onClick={() => onClick('https://www.apple.com/ua/app-store/')}>
            <Box
              component="img"
              src={`${process.env.PUBLIC_URL}/img/app-store.png`}
              alt="google play"
              sx={googleAppleBtn}
            />
          </Button>
          <Box sx={arrow}><DoubleLoopArrow /></Box>
        </Box>
      </Box>
      <Box
        component="img"
        src={`${process.env.PUBLIC_URL}/img/mobile.png`}
        alt="phone"
        sx={mobileImg}
      />
    </Container>
  );
};

export default MobileApp;
