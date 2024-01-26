import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import {
  skeletonFormWrapper,
  skeletonImg,
  skeletonWrapper,
  skeletonInput,
  animation,
} from './styles';

const Skeleton = ({ type }) => {
  return (
    <Box sx={{
      ...skeletonWrapper,
    }}
    >
      <Box sx={{
        ...skeletonImg,
        ...animation,
      }}
      />
      <Box sx={{
        ...skeletonFormWrapper,
      }}
      >
        {type === 'dish' && (
          <>
            <Box sx={{
              ...skeletonInput,
              ...animation,
            }}
            />
            <Box sx={{
              ...skeletonInput,
              ...animation,
            }}
            />
          </>
        )}
        <Box sx={{
          ...skeletonInput,
          ...animation,
        }}
        />
        <Box sx={{
          ...skeletonInput,
          ...animation,
        }}
        />
        <Box sx={{
          ...skeletonInput,
          ...animation,
        }}
        />
        <Box sx={{
          ...skeletonInput,
          ...animation,
        }}
        />
        <Box sx={{
          ...skeletonInput,
          ...animation,
        }}
        />
      </Box>
    </Box>
  );
};

export default Skeleton;

Skeleton.propTypes = {
  type: PropTypes.string,
};

Skeleton.defaultProps = {
  type: 'partner',
};
