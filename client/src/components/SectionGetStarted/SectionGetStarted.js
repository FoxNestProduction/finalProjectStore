import React, { memo } from 'react';
import { Typography, Container, Box, Rating, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useBreakpoint from '../../customHooks/useBreakpoint';
import { stylesReviewAmount, stylesStarts, stylesTrustpilot, stylesProBnt, stylesStartedBnt, stylesTextContainer, stylesLabel, stylesTitle, stylesSection, stylesDescription, stylesActions, stylesRating, stylesImage } from './styles';

const SectionGetStarted = () => {
  const { i18n, t } = useTranslation();
  const starsValue = 4;
  const breakPoint = useBreakpoint();
  const title = {
    short:
  <>
    {t('sectionGetStarted.enjoyFoods')}
    <br />
    {t('sectionGetStarted.overWorld')}
  </>,
    long:
  <>
    {t('sectionGetStarted.enjoyFoodsAll')}
    <br />
    {t('sectionGetStarted.overTheWorld')}
  </>,
  };

  return (
    <Container
      component="section"
      sx={stylesSection}
    >
      <Box sx={stylesTextContainer}>
        <Typography
          component="span"
          sx={stylesLabel}
        >
          {t('sectionGetStarted.over1000Users')}
        </Typography>
        <Typography
          variant="h1"
          component="h1"
          sx={stylesTitle}
        >
          {breakPoint === 'mobile' ? title.short : title.long}
        </Typography>
        <Typography component="p" sx={stylesDescription}>
          {/* eslint-disable-next-line max-len */}
          {t('sectionGetStarted.discription')}
        </Typography>
        <Box sx={stylesActions}>
          <Button sx={stylesStartedBnt} component={RouterLink} to="/menu" variant="contained">
            {t('sectionGetStarted.buttonGetStarted')}
            {/* Get Started */}
          </Button>
          <Button sx={stylesProBnt} component={RouterLink} to="/pricing" variant="outlined" disabled>
            Go Pro
          </Button>
        </Box>
        <Box sx={stylesRating}>
          <img
            style={{
              position: 'relative',
              top: '-4px',
              left: '-2px',
            }}
            src="/img/layout/trustpilotIcon.png"
            alt=""
          />
          <Typography sx={stylesTrustpilot} variant="h6" component="span">Trustpilot</Typography>
          <Rating sx={stylesStarts} name="read-only" value={starsValue} readOnly />
          <Typography sx={stylesReviewAmount} component="span">4900+</Typography>
        </Box>
      </Box>
      <Box sx={stylesImage}>
        <img
          src="/img/layout/getStartedSectionImage.png"
          alt=""
        />
      </Box>
    </Container>
  );
};

export default memo(SectionGetStarted);
