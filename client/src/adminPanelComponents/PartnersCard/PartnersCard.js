import { Box, Card, CardHeader, Button, CardMedia, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import {
  card,
  cardHeader,
  cardTitle,
  imgWrapper,
  disabledCardStyles,
  imgStyles,
} from './styles';
import DisableBtn from '../components/DisableBtn/DisableBtn';
import { fetchGetPartner } from '../../redux/slices/partnersSlice';

const PartnersCard = ({ title, url, enabled, partner }) => {
  const isTablet = useMediaQuery('(min-width: 689px)');
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
                m: {
                  tablet: '4px 8px 4px 0',
                  lgTablet: '0',
                },
              }}
            >
              <DisableBtn
                item={partner}
                type="partner"
                isAllPartnersPage
                customStyles={{
                  position: {
                    mobile: 'relative',
                    lgTablet: 'absolute',
                    desktop: 'absolute',
                  },
                  top: {
                    mobile: '3px',
                    tablet: '2px',
                    lgTablet: '3px',
                    desktop: '6px',
                  },
                  right: {
                    mobile: '0',
                  },
                  fontSize: {
                    mobile: '12px',
                    tablet: '14px',
                    lgTablet: '20px',
                    desktop: '24px',
                  },
                  width: {
                    mobile: 'auto',
                    lgTablet: '17%',
                    desktop: '15%',
                  },
                }}
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
