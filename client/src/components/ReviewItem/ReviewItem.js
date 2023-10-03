import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
// import CardContentText from '@mui/material/CardContentText';
import CardActions from '@mui/material/CardActions';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';

const ReviewItem = () => {
  const [value, setValue] = useState();
  const reveiw = {
    _id: '650872a97c6b8f8dc9ab38d3',
    user_id: '650762989d951058716e2f85',
    rating: 5,
    comment: 'I am very satisfied with this product. Everything works excellently.',
  };
  const user = {
    _id: '650762989d951058716e2f85',
    firstName: 'Ihor',
    lastName: 'Kacher',
    avatarUrl: '',
  };
  const { id, firstName, lastName, avatarUrl } = user;
  const { raiting, comment } = reveiw;

  return (
    <Card sx={{ width: '19vw', minHeight: '17vh', px: '9px', pt: '10px', pb: '6px', spacing: '22px' }}>
      <CardHeader
        avatar={(
          <Avatar>
            R
          </Avatar>
        )}
        title={
          `${lastName} ${firstName}`
        }
        action={
          <FormatQuoteRoundedIcon size="large" sx={{ transform: 'rotate(180deg)', color: 'background.footer' }} />
        }
      />
      <CardContent>
        {/* <CardContentText> */}
        {comment}
        {/* </CardContentText> */}
      </CardContent>
      <CardActions sx={{ p: 2 }}>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </CardActions>
    </Card>
  );
};

export default ReviewItem;
