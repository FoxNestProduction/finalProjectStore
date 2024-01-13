import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import {
  Box,
  Button,
  CardMedia,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Typography,
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SatelliteOutlinedIcon from '@mui/icons-material/SatelliteOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Field, Form, Formik } from 'formik';
import useGetAPI from '../../customHooks/useGetAPI';

import { ReactComponent as Edit } from '../../assets/svg/edit.svg';
import SelectForFormik from '../../components/inputs/Select/Select';
import Input from '../../components/inputs/Input/Input';
import validationSchema from './validationSchema';

import { flexCenter, container, title, imgContainer, imgEditBtn, submitBtn } from './styles';
import { instance } from '../../API/instance';

const AddEditProductPage = () => {
  const [restaurant, setRestaurant] = useState('');
  const [foodCategory, setFoodCategory] = useState('');
  const [checkedList, setCheckedList] = useState({
    isTrending: false,
    isHealthy: false,
    isSupreme: false,
  });
  const [imageUrl, setImageUrl] = useState('');

  const cloudName = 'dvtjgmpnr';
  const uploadPreset = 'nggr2j5w';
  const uwConfig = {
    cloudName,
    uploadPreset,
    folder: `EatlyProject/products/${restaurant}`,
  };

  const handleOpenWidget = () => {
    // eslint-disable-next-line no-undef
    const myWidget = cloudinary.createUploadWidget(
      uwConfig,
      (error, result) => {
        if (!error && result && result.event === 'success') {
          setImageUrl(result.info.secure_url);
        }
      },
    );
    if (restaurant && foodCategory) {
      myWidget.open();
    }
  };

  const [partners] = useGetAPI('/partners/names');
  const [categories] = useGetAPI('/products/categories');
  const [maxNo] = useGetAPI('/products/itemNo');

  const location = useLocation();
  const navigate = useNavigate();

  const { itemNo } = useParams();
  const [dish, loading] = useGetAPI(`/products/${itemNo}`);
  console.log(dish);

  const initialValues = {
    name: dish ? dish.name : '',
    price: dish ? dish.currentPrice : '',
    descriptionEN: dish ? dish.description.en : '',
    descriptionUA: dish ? dish.description.ua : '',
    descriptionPL: dish ? dish.description.pl : '',
  };

  const handleChangeCheckbox = (element) => {
    setCheckedList((prev) => ({
      ...prev,
      [element]: !prev[element],
    }));
  };

  const handleSubmit = async (values) => {
    const {
      descriptionEN,
      descriptionPL,
      descriptionUA,
      name,
      price,
    } = values;
    const { isTrending, isHealthy, isSupreme } = checkedList;

    const newProduct = {
      restaurant_name: restaurant,
      name,
      description: {
        en: descriptionEN,
        pl: descriptionPL,
        ua: descriptionUA,
      },
      currentPrice: price,
      isSupreme,
      isHealthy,
      filterCategories: foodCategory,
      imageUrl,
      enabled: true,
      isTrending,
      itemNo: maxNo + 1,
    };
    try {
      const data = await instance.post('/products', newProduct);
      if (data.status === 200) {
        navigate('/menu');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="section">
      <Box
        sx={container}
      >
        <Typography
          sx={title}
        >
          {!dish ? 'Add new dish' : dish.name}
        </Typography>

        <Box>
          {location.pathname !== '/menu/newProduct' && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button>
                <Typography>{location.pathname === '/menu/newProduct' ? 'Disable' : 'Activate'}</Typography>
              </Button>
              <Button>
                <Edit />
              </Button>
            </Box>
          )}
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ isValid }) => (
              <Form style={{ width: '100%' }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', columnGap: '24px' }}>
                  <Box sx={{
                    ...imgContainer,
                    ...flexCenter,
                  }}
                  >
                    {!dish && !imageUrl ? <SatelliteOutlinedIcon sx={{ fontSize: '346px' }} /> : (
                      <CardMedia
                        component="img"
                        image={!dish ? imageUrl : dish.imageUrl}
                        sx={{
                          maxWidth: '400px',
                          maxHeight: '400px',
                          borderRadius: '16px',
                        }}
                      />
                    )}
                    <Button sx={imgEditBtn} onClick={() => handleOpenWidget()}>
                      <Edit />
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      rowGap: '24px',
                    }}
                  >
                    <FormControl sx={{ width: '100%' }}>
                      <InputLabel id="restaurant">Name restaurant</InputLabel>
                      {partners && (
                        <Field
                          name="restaurant"
                          label="Restaurant"
                          component={SelectForFormik}
                          labelId="restaurant"
                          id="restaurant"
                          bgColor="#FFF"
                          onChange={(event) => {
                            const selectedRestaurant = event.target.value;
                            setRestaurant(selectedRestaurant);
                          }}
                        >
                          {partners.map((el) => (
                            <MenuItem key={el} value={el}>{el}</MenuItem>
                          ))}
                        </Field>
                      )}
                    </FormControl>
                    <Input
                      name="name"
                      id="name_dish"
                      label="Name dish"
                      bgColor="#FFF"
                    />
                    <FormControl fullWidth>
                      <InputLabel id="checkout-city-label">Category</InputLabel>
                      {categories && (
                        <Field
                          name="category"
                          label="Category"
                          component={SelectForFormik}
                          labelId="category"
                          id="category"
                          bgColor="#FFF"
                          onChange={(event) => {
                            const selectedCategory = event.target.value;
                            setFoodCategory(selectedCategory);
                          }}
                        >
                          {categories.map((el) => (
                            <MenuItem key={el} value={el}>{el}</MenuItem>
                          ))}
                        </Field>
                      )}
                    </FormControl>
                    <Input
                      name="price"
                      id="price"
                      label="Price"
                      bgColor="#FFF"
                      icon={<AttachMoneyIcon />}
                    />
                    <Input
                      name="descriptionEN"
                      id="descriptionEN"
                      label="Description (EN)"
                      bgColor="#FFF"
                    />
                    <Input
                      name="descriptionUA"
                      id="descriptionUA"
                      label="Description (UA)"
                      bgColor="#FFF"
                    />
                    <Input
                      name="descriptionPL"
                      id="descriptionPL"
                      label="Description (PL)"
                      bgColor="#FFF"
                    />
                    <FormControlLabel
                      control={(
                        <Checkbox
                          disableRipple
                          icon={<RadioButtonUncheckedOutlinedIcon />}
                          checkedIcon={<CheckCircleOutlineOutlinedIcon />}
                          onClick={() => handleChangeCheckbox('isTrending')}
                        />
                      )}
                      label="Trending"
                      labelPlacement="start"
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    />
                    <FormControlLabel
                      control={(
                        <Checkbox
                          disableRipple
                          icon={<RadioButtonUncheckedOutlinedIcon />}
                          checkedIcon={<CheckCircleOutlineOutlinedIcon />}
                          onClick={() => handleChangeCheckbox('isHealthy')}
                        />
                      )}
                      label="Healthy"
                      labelPlacement="start"
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    />
                    <FormControlLabel
                      control={(
                        <Checkbox
                          disableRipple
                          icon={<RadioButtonUncheckedOutlinedIcon />}
                          checkedIcon={<CheckCircleOutlineOutlinedIcon />}
                          onClick={() => handleChangeCheckbox('isSupreme')}
                        />
                      )}
                      label="Supreme"
                      labelPlacement="start"
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    />
                    <Button
                      disableRipple
                      variant="contained"
                      sx={submitBtn}
                      type="submit"
                      disabled={!isValid && !imageUrl}
                    >
                      Confirm
                    </Button>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Container>
  );
};

export default AddEditProductPage;
