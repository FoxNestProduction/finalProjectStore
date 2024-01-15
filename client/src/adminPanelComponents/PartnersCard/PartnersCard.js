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
                border: 'none',
                outline: '2px solid #FB471D',
                color: '#000000',
                fontFamily: 'fontFamily',
                fontSize: {
                  mobile: '18px',
                },
                px: '1.5em',
                position: 'absolute',
                top: '14px',
                right: '0',
                transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
                  backgroundColor: 'common.white',
                  outline: 'none',
                  border: 'none',
                },
                '&:active': {
                  boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.2)',
                  transform: 'translateY(1px)',
                  backgroundColor: '#EAEAEA',
                },
              }}
            >
              Disable
            </Button>
          )}
        />
        <Box
          sx={{
            position: 'relative',
          }}
        >
          {!enabled ? (
            <Box
              sx={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                background: 'rgba(217, 217, 217, 0.60)',

              }}
            />
          ) : null}
          <CardMedia
            component="img"
            image={`${url}`}
            sx={{
              display: 'block',
              width: '1035px',
              height: '495px',
              borderRadius: '16px',
            }}
            alt={`Restaurant ${title}`}
          />
        </Box>
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
