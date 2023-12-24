import { Box, Card, CardHeader, Button, CardMedia, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const PartnersCard = ({ title, url, enabled }) => {
  return (
    <Box>
      <Card
        sx={{
          maxWidth: '1083px',
          maxHeight: '611px',
          width: '100%',
          padding: '10px 24px 24px 24px',
        }}
      >
        <CardHeader
          sx={{
            p: '0 16px 16px 16px',
            position: 'relative',
          }}
          title={(
            <Typography
              sx={{
                fontSize: {
                  mobile: '38px',
                  fontWeight: '500',
                  fontFamily: 'fontPoppins',
                },
              }}
            >
              {title}
            </Typography>
          )}
          action={(
            <Button
              onClick={(event) => {
                event.preventDefault();
              }}
              aria-label="disable"
              variant="outlined"
              sx={{
                borderColor: '#FB471D',
                color: '#000000',
                fontFamily: 'fontFamily',
                fontSize: {
                  mobile: '18px',
                },
                px: '1.5em',
                position: 'absolute',
                top: '14px',
                right: '0',
              }}
            >
              Disable
            </Button>
          )}
        />
        <CardMedia
          component="img"
          image={`${url}`}
          sx={{
            width: '1035px',
            height: '495px',
            borderRadius: '16px',
          }}
          alt={`Restaurant ${title}`}
        />
      </Card>
    </Box>
  );
};

PartnersCard.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
  enabled: PropTypes.bool.isRequired,
};

PartnersCard.defaultProps = {
  url: '',
};

export default PartnersCard;
