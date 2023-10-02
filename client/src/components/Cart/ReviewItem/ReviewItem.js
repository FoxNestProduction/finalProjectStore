import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardContentText from '@mui/material/CardContentText';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';

const ReviewItem = () => {
  return (
    <Card>
      <CardHeader>
        <Avatar>
          {avatarUrl}
        </Avatar>
        title={name}
        {/* subheader="Data" */}
      </CardHeader>
      <CardContent>
        <CardContentText>

        </CardContentText>
      </CardContent>

    </Card>
  )
}

export default ReviewItem