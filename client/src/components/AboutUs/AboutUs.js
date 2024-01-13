/* eslint-disable max-len */
import React, { memo } from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
  const { i18n, t } = useTranslation();
  return (
    <Container sx={{ paddingBottom: '30px', color: 'text.primary' }}>
      <Typography variant="h2" component="h2" sx={{ marginTop: '30px', paddingLeft: '10px' }} gutterBottom>
        {t('aboutUsPage.title_1')}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h3" gutterBottom>
              {t('aboutUsPage.title_2')}
            </Typography>
            <Typography>
              {t('aboutUsPage.discription_1')}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h3" component="h3" gutterBottom>
              {t('aboutUsPage.title_3')}
            </Typography>
            <Typography>
              {t('aboutUsPage.discription_2')}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h3" component="h3" gutterBottom>
              {t('aboutUsPage.title_4')}
            </Typography>
            <Typography>
              {t('aboutUsPage.discription_3')}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h3" component="h3" gutterBottom>
              {t('aboutUsPage.title_5')}
            </Typography>
            <Typography>
              {t('aboutUsPage.discription_4_1')}
              <a href="mailto:eatly.supp@gmail.com" style={{ fontWeight: 'bold', color: '#6C5FBC' }}>
                {' '}
                eatly.supp@gmail.com
                {' '}
              </a>
              {t('aboutUsPage.discription_4_2')}
              <a href="/contact" style={{ fontWeight: 'bold', color: '#6C5FBC' }}>
                {' '}
                {t('aboutUsPage.discription_4_3')}
                {' '}
              </a>
              .
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default memo(AboutUs);
