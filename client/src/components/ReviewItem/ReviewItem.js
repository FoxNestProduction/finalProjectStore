import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box } from '@mui/material';
import { searchReviews, setIndexSearchReview } from '../../redux/slices/reviewsSlice';

import { stylesCardReview, stylesQuoteIcon, stylesActionCard, stylesContent, stylesText, stylesFullText } from './styles';

const ReviewItem = ({ review, index }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { rating, content, avatarUrl, date, _id: id, customer: { lastName, firstName } } = review;

  const isMoreThreeLineText = (content && content.length >= 150) && (location.pathname !== '/reviews');
  const styleComment = (location.pathname === '/reviews') ? stylesFullText : { ...stylesText };
  const widthWrapper = !(location.pathname === '/reviews') ? { mobile: '100%', tablet: '345px', desktop: '485px' } : '100%';

  const ratingNumber = Number(rating);
  const dateReview = new Date(date);
  const day = String(dateReview.getDate()).padStart(2, '0');
  const month = String(dateReview.getMonth() + 1).padStart(2, '0');
  const year = dateReview.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;

  const handleReviewClick = () => {
    if (location.pathname !== '/reviews') {
      navigate('/reviews');
      dispatch(searchReviews(id));
      dispatch(setIndexSearchReview(index));
    }
  };

  return (
    <Card sx={{ ...stylesCardReview, width: widthWrapper }} onClick={() => handleReviewClick(id)}>
      <CardHeader
        avatar={(
          <Avatar>
            { avatarUrl || <PersonOutlineOutlinedIcon /> }
          </Avatar>
        )}
        title={
          `${lastName} ${firstName}`
        }
        action={
          <FormatQuoteRoundedIcon sx={stylesQuoteIcon} />
        }
      />
      <CardContent sx={stylesContent}>
        <Box sx={{ ...styleComment }}>
          {content}
        </Box>
        {isMoreThreeLineText && (
          <MoreHorizIcon
            sx={{ position: 'absolute', right: '30px', cursor: 'pointer' }}
          />
        )}
      </CardContent>
      <CardActions sx={stylesActionCard}>
        <Rating
          name="simple-controlled"
          value={ratingNumber}
          readOnly
        />
        <Typography sx={{ color: 'text.secondary' }}>{formattedDate}</Typography>
      </CardActions>
    </Card>
  );
};

ReviewItem.propTypes = {
  review: PropTypes.object,
  index: PropTypes.number,
};
ReviewItem.defaultProps = {
  review: {},
  index: null,
};

export default memo(ReviewItem);
