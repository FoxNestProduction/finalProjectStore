import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  CardActions,
  CardMedia,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Typography,
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SatelliteOutlinedIcon from '@mui/icons-material/SatelliteOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import useGetAPI from '../../../customHooks/useGetAPI';

import { ReactComponent as Edit } from '../../../assets/svg/edit.svg';
import SelectForFormik from '../../../components/inputs/Select/Select';
import Input from '../../../components/inputs/Input/Input';
import validationSchema from './validationSchema';

import { btnsWrapper, input, btn, flexCenter, title, imgContainer, imgEditBtn, submitBtn } from './styles';
import { instance } from '../../../API/instance';
import { mainContainer } from '../../pages/commonStyles';
import { fetchUpdateProduct } from '../../../redux/slices/productsSlice';
import { DESCRIPTION } from '../../constants';

import { containedBtnStyles, outlinedBtnStyles } from '../../../muiTheme/buttonsStyles';

const AddEditProductForm = ({ isNewItem, dish, isEditing, setIsEditing }) => {
  const [restaurant, setRestaurant] = useState('');
  const [foodCategory, setFoodCategory] = useState('');
  const [checkedList, setCheckedList] = useState({
    isTrending: false,
    isHealthy: false,
    isSupreme: false,
  });

  const dispatch = useDispatch();

  const [imageUrl, setImageUrl] = useState('');

  const cloudName = process.env.REACT_APP_CLOUD_NAME;
  const uploadPreset = process.env.REACT_APP_UPLOAD_PRESSET;
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
    myWidget.open();
  };

  const [partners] = useGetAPI('/partners/names');
  const [categories] = useGetAPI('/products/categories');

  const navigate = useNavigate();

  const handleDisable = async () => {
    dispatch(fetchUpdateProduct({ itemNo: dish.itemNo, body: { enabled: !dish.enabled } }));
  };

  useEffect(() => {
    if (dish) {
      setRestaurant(dish.restaurant_name);
      setFoodCategory(dish.filterCategories);
      setCheckedList({
        isTrending: dish.isTrending,
        isHealthy: dish.isHealthy,
        isSupreme: dish.isSupreme,
      });
    }
  }, [dish]);

  const description = useMemo(() => (dish?.description || { ua: '', pl: '', en: '' }), [dish]);

  const partnerValidationNames = useMemo(() => {
    return Object.entries(description).map(([lang]) => `${DESCRIPTION}${lang}`);
  }, [description]);

  const descriptionArr = useMemo(() => (Object.entries(description).map(([lang, value]) => {
    return [`${DESCRIPTION}${lang}`, value];
  })), [description]);

  const initialValues = {
    restaurant: '',
    name: dish ? dish.name : '',
    category: '',
    price: dish ? dish.currentPrice : '',
    ...Object.fromEntries(descriptionArr),
    isTrending: '',
    isHealthy: '',
    isSupreme: '',
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

  const handleInputDoubleClick = (e) => {
    if (e.detail === 2) {
      setIsEditing(true);
      e.target.focus();
    }
  };

  return (
    <Container component="section" sx={mainContainer}>
      <Box>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema(partnerValidationNames)}
        >
          {({ values, isValid }) => (
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
                  <Button sx={imgEditBtn} onClick={handleOpenWidget}>
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
                        value={dish ? dish.restaurant_name : restaurant}
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
                    bgColor={isEditing ? 'common.white' : undefined}
                    styles={input}
                    readOnly={!isEditing}
                    value={values.name}
                    onClick={handleInputDoubleClick}
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
                        value={dish ? dish.filterCategories : foodCategory}
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
                    bgColor={isEditing ? 'common.white' : undefined}
                    styles={input}
                    readOnly={!isEditing}
                    onClick={handleInputDoubleClick}
                    icon={<AttachMoneyIcon />}
                  />
                  {Object.keys(description).map((lang) => (
                    <Input
                      key={lang}
                      name={`${DESCRIPTION}${lang}`}
                      id={`editPartnerDescription${lang}`}
                      label={`Description (${lang.toUpperCase()})`}
                      bgColor={isEditing ? 'common.white' : undefined}
                      styles={input}
                      onClick={handleInputDoubleClick}
                      multiline
                      maxRows={8}
                      readOnly={!isEditing}
                    />
                  ))}
                  <FormControlLabel
                    control={(
                      <Checkbox
                        disableRipple
                        icon={<RadioButtonUncheckedOutlinedIcon />}
                        checkedIcon={<CheckCircleOutlineOutlinedIcon />}
                        onClick={() => handleChangeCheckbox('isTrending')}
                        defaultChecked={dish && dish.isTrending}
                      />
                    )}
                    name="isTrending"
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
                        defaultChecked={dish && dish.isHealthy}
                      />
                    )}
                    name="isHealthy"
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
                        defaultChecked={dish && dish.isSupreme}
                      />
                    )}
                    name="isSupreme"
                    label="Supreme"
                    labelPlacement="start"
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  />
                  {isEditing && (
                    <Box sx={btnsWrapper}>
                      <Button
                        type="button"
                        variant="outlined"
                        sx={{ ...btn, ...outlinedBtnStyles }}
                        disableRipple
                        onClick={() => { setIsEditing(false); }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{ ...btn, ...containedBtnStyles }}
                        disableRipple
                        disabled={!isValid}
                      >
                        Save
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

AddEditProductForm.propTypes = {
  dish: PropTypes.object,
  isNewItem: PropTypes.bool,
  isEditing: PropTypes.bool,
  setIsEditing: PropTypes.func,
};

AddEditProductForm.defaultProps = {
  dish: {},
  isNewItem: false,
  isEditing: false,
  setIsEditing: () => {},
};

export default AddEditProductForm;
