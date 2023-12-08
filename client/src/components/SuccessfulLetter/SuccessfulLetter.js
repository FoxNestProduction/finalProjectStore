import React, { memo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

const SuccessfulLetter = () => {
  const { i18n, t } = useTranslation();
  return (
    <Box sx={{ px: 3, pb: 4, display: 'flex', flexDirection: 'column', gap: 3, maxWidth: '560px' }}>
      <Box>
        <img src="./img/sendMail.svg" alt="send mail" />
      </Box>
      <Typography variant="h3" color="primary.main">
        {t('successfulLetter.text1')}
      </Typography>
      <Typography variant="body3">
        {t('successfulLetter.text2')}
      </Typography>
      <Typography sx={{ fontSize: '6px', color: 'text.secondaryGray', fontStyle: 'italic' }}>
        {t('successfulLetter.text3')}
      </Typography>
      <Typography variant="body5" color="primary.main">
        {t('successfulLetter.text4')}
      </Typography>
    </Box>
  );
};

export default memo(SuccessfulLetter);
