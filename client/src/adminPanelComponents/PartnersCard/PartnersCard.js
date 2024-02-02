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
import DisableBtn from '../components/DisableBtn/DisableBtn';
import { fetchGetPartner } from '../../redux/slices/partnersSlice';

const PartnersCard = ({ title, url, enabled, partner }) => {
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
            <Box
              onClick={(event) => {
                event.preventDefault();
              }}
              sx={{
                position: {
                  mobile: '',
                  tablet: 'relative',
                  lgTablet: 'absolute',
                  desktop: 'absolute',
                },
                top: {
                  mobile: '',
                  tablet: '7px',
                  lgTablet: '3px',
                  desktop: '8px',
                },
                right: {
                  mobile: '',
                  tablet: '7px',
                  lgTablet: '0',
                },
                marginLeft: {
                  mobile: '0',
                  tablet: '8px',
                  lgTablet: '0',
                },
              }}
            >
              <DisableBtn
                item={partner}
                type="partner"
                isLarge
              />
            </Box>

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
  partner: PropTypes.object.isRequired,
};

PartnersCard.defaultProps = {
  url: '',
};

export default PartnersCard;
