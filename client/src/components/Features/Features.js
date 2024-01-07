import { Box, Container, Typography } from '@mui/material';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { flexCenter, featuresContainer, itemContainer, itemTitle, descriptionBox, description, lineBreak, featuresBG } from './styles';

const Features = () => {
  const { i18n, t } = useTranslation();
  return (
    <Box sx={featuresBG}>
      <Container component="section" sx={featuresContainer}>
        <Box sx={{ ...flexCenter, ...itemContainer }}>
          <Typography component="h1" sx={itemTitle}>10K+</Typography>
          <Box sx={{ ...flexCenter, ...descriptionBox }}>
            <Typography component="p" sx={description}>{t('features.satisfiedCostumers')}</Typography>
            <Typography component="p" sx={description}>{t('features.allGreatOverTheWorld')}</Typography>
          </Box>
        </Box>
        <Typography component="span" sx={lineBreak} />
        <Box sx={{ ...flexCenter, ...itemContainer }}>
          <Typography component="h1" sx={itemTitle}>4M</Typography>
          <Box sx={{ ...flexCenter, ...descriptionBox }}>
            <Typography component="p" sx={description}>{t('features.healthyDishesSold')}</Typography>
            <Typography component="p" sx={description}>{t('features.includingMilkShakesSmooth')}</Typography>
          </Box>
        </Box>
        <Typography component="span" sx={lineBreak} />
        <Box sx={{ ...flexCenter, ...itemContainer }}>
          <Typography component="h1" sx={itemTitle}>99.99%</Typography>
          <Box sx={{ ...flexCenter, ...descriptionBox }}>
            <Typography component="p" sx={description}>{t('features.reliableCustomerSupport')}</Typography>
            <Typography component="p" sx={description}>{t('features.weProvideGreatExperiences')}</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default memo(Features);
