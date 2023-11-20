import { Box, Container, Typography } from '@mui/material';
import React, { memo } from 'react';
import { flexCenter, featuresContainer, itemContainer, itemTitle, descriptionBox, description, lineBreak, featuresBG } from './styles';

const Features = () => {
  return (
    <Box sx={featuresBG}>
      <Container component="section" sx={featuresContainer}>
        <Box sx={{ ...flexCenter, ...itemContainer }}>
          <Typography component="h1" sx={itemTitle}>10K+</Typography>
          <Box sx={{ ...flexCenter, ...descriptionBox }}>
            <Typography component="p" sx={description}>Satisfied Costumers</Typography>
            <Typography component="p" sx={description}>All Great Over The World</Typography>
          </Box>
        </Box>
        <Typography component="span" sx={lineBreak} />
        <Box sx={{ ...flexCenter, ...itemContainer }}>
          <Typography component="h1" sx={itemTitle}>4M</Typography>
          <Box sx={{ ...flexCenter, ...descriptionBox }}>
            <Typography component="p" sx={description}>Healthy Dishes Sold</Typography>
            <Typography component="p" sx={description}>Including Milk Shakes Smooth</Typography>
          </Box>
        </Box>
        <Typography component="span" sx={lineBreak} />
        <Box sx={{ ...flexCenter, ...itemContainer }}>
          <Typography component="h1" sx={itemTitle}>99.99%</Typography>
          <Box sx={{ ...flexCenter, ...descriptionBox }}>
            <Typography component="p" sx={description}>Reliable Customer Support</Typography>
            <Typography component="p" sx={description}>We Provide Great Experiences</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default memo(Features);
