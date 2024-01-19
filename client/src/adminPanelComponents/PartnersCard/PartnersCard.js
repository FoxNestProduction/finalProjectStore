import { Box, Card, CardHeader, Button, CardMedia, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import {
  card,
  cardHeader,
  cardTitle,
  disableButton,
  imgWrapper,
  disabledCardStyles,
  imgStyles,
} from './styles';

const PartnersCard = ({ title, url, enabled }) => {
  return (
    <Box>
      <Card
        sx={card}
      >
        <CardHeader
          sx={cardHeader}
          title={(
            <Typography
              sx={cardTitle}
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
              sx={disableButton}
            >
              Disable
            </Button>
          )}
        />
        <Box
          sx={imgWrapper}
        >
          {!enabled ? (
            <Box
              sx={disabledCardStyles}
            />
          ) : null}
          <CardMedia
            component="img"
            image={`${url}`}
            sx={imgStyles}
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
