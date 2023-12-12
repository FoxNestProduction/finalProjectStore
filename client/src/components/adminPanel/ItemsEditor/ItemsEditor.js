import React, { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import { Card, CardContent, Container } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {
  card,
  cardImgWrapper,
  cardImg,
  formWrapper,
  infoWrapper,
  toggleDisableBtn,
  disableBtn,
  activateBtn, showDishesBtn,
} from './styles';
import EditIcon from '../../../assets/svgComponents/EditIcon';
import PartnerEditForm from '../PartnerEditForm/PartnerEditForm';
import { outlinedBtnStyles } from '../../../muiTheme/buttonsStyles';

const ItemsEditor = () => {
  const item = {
    _id: '657242011827208846e79587',
    name: 'Welcome Pizzeria',
    description: {
      'en': "Delicious dishes from Italian cuisine: a culinary journey that transports your taste buds to the heart of Italy. Indulge in a symphony of flavors, where every bite is a celebration of tradition, passion, and craftsmanship. Our chefs, true artisans of their craft, painstakingly create each dish to embody the essence of Italy's rich gastronomic heritage.",
      'ua': 'Смачні страви італійської кухні: кулінарна подорож, яка перенесе ваші смакові рецептори в серце Італії. Насолоджуйтеся симфонією смаків, де кожен шматочок є святом традицій, пристрасті та майстерності. Наші кухарі, справжні майстри своєї справи, ретельно створюють кожну страву, щоб втілити суть багатої гастрономічної спадщини Італії.',
      'pl': 'Pyszne dania kuchni włoskiej: kulinarna podróż, która przeniesie Twoje kubki smakowe do serca Włoch. Rozkoszuj się symfonią smaków, gdzie każdy kęs jest celebracją tradycji, pasji i rzemiosła. Nasi szefowie kuchni, prawdziwi rzemieślnicy w swoim rzemiośle, starannie tworzą każde danie, aby ucieleśnić esencję bogatego dziedzictwa gastronomicznego Włoch.',
    },
    isBookmark: false,
    isHealthy: false,
    rating: {
      $numberInt: '4',
    },
    filterCategories: 'pizza',
    address: '123 Main Street',
    imageUrl: 'https://res.cloudinary.com/dvtjgmpnr/image/upload/c_scale,w_650/v1696613466/EatlyProject/restaurants/welcome_pizzeria_hgfw99.png',
    enabled: true,
    isSupreme: true,
    isTrending: true,
    customId: '17001',
  };

  const [isEditing, setIsEditing] = useState(false);

  // const handleEditInfo = () => {
  //   setIsEditing(true);
  // };

  return (
    <Card sx={card}>
      <CardActions sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: {
          mobile: '6%',
          lgTablet: '5%',
          desktop: '4%',
        },
        p: '0',
        mb: '23px',
      }}
      >
        <Button
          type="button"
          variant="outlined"
          size="small"
          sx={{ ...toggleDisableBtn, ...(item.enabled ? disableBtn : activateBtn) }}
        >
          {item.enabled ? 'Disable' : 'Activate'}
        </Button>
        <IconButton
          sx={{
            bgcolor: 'background.footer',
          }}
          onClick={() => { setIsEditing(true); }}
        >
          <EditIcon />
        </IconButton>
      </CardActions>
      <Box sx={infoWrapper}>
        <CardMedia sx={cardImgWrapper}>
          <Box
            component="img"
            src={item.imageUrl}
            alt={item.name}
            sx={cardImg}
          />
        </CardMedia>
        <Box sx={formWrapper}>
          <PartnerEditForm
            restaurant={item}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </Box>
      </Box>
      {!isEditing && (
      <CardActions sx={{ justifyContent: 'flex-end',
        p: '0',
        mt: {
          mobile: '20px',
          desktop: '10px',
        } }}
      >
        <Button type="button" variant="outlined" size="small" sx={showDishesBtn}>Show dishes</Button>
      </CardActions>
      )}
    </Card>
  );
};

ItemsEditor.propTypes = {

};

ItemsEditor.defaultProps = {

};

export default memo(ItemsEditor);
