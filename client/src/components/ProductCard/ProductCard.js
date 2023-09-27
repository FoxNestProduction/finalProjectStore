import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

const ProductCard = () => {
  return (
    <Container>
      <Card>
        <CardHeader>Header</CardHeader>
        <CardMedia>Image</CardMedia>
        <CardContent>Text</CardContent>
        <CardActions>
          <Button variant="outlined">Favourite</Button>
          <Button variant="contained">Add to card</Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default ProductCard;
