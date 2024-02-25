import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  CardMedia,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Field, Form, Formik } from 'formik';
import useGetAPI from '../../../customHooks/useGetAPI';

import SelectForFormik from '../../../components/inputs/Select/Select';
import Input from '../../../components/inputs/Input/Input';
import validationSchema from './validationSchema';

import {
  infoWrapper,
  btnsWrapper,
  input,
  btn,
  imgContainer,
  imgEditBtn,
  productCardImg,
  formWrapper,
  inputsWrapper,
  badge,
} from './styles';
import { instance } from '../../../API/instance';
import { DESCRIPTION } from '../../constants';

import { containedBtnStyles, outlinedBtnStyles } from '../../../muiTheme/buttonsStyles';
import Skeleton from '../../Skeleton/Skeleton';
import EditIcon from '../../../assets/svgComponents/EditIcon';

import { fetchUpdateProduct } from '../../../redux/slices/productsSlice';

const AddEditProductForm = ({ dish, isEditing, setIsEditing }) => {
  const [restaurant, setRestaurant] = useState('');
  const [foodCategory, setFoodCategory] = useState('');
  const [checkedList, setCheckedList] = useState({
    isTrending: false,
    isHealthy: false,
    isSupreme: false,
  });
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

  useEffect(() => {
    if (dish) {
      setRestaurant(dish?.restaurant_name);
      setFoodCategory(dish?.filterCategories);
      setCheckedList({
        isTrending: dish?.isTrending,
        isHealthy: dish?.isHealthy,
        isSupreme: dish?.isSupreme,
      });
    }
  }, [dish]);

  const description = useMemo(() => (dish?.description || { uk: '', pl: '', en: '' }), [dish]);

  const partnerValidationNames = useMemo(() => {
    return Object.entries(description).map(([lang]) => `${DESCRIPTION}${lang}`);
  }, [description]);

  const descriptionArr = useMemo(() => (Object.entries(description).map(([lang, value]) => {
    return [`${DESCRIPTION}${lang}`, value];
  })), [description]);

  const initialValues = {
    restaurant: '',
    name: dish ? dish?.name : '',
    category: '',
    price: dish ? dish?.currentPrice : '',
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

  const handleDoubleClick = (e) => {
    if (e.detail === 2) {
      setIsEditing(true);
      e.target.focus();
    }
  };

  const cancelEditForm = () => {
    setIsEditing(false);
    setCheckedList({
      isTrending: dish?.isTrending,
      isHealthy: dish?.isHealthy,
      isSupreme: dish?.isSupreme,
    });
  };

  return (
    <Box>
      {!dish ? <Skeleton type="dish" /> : (
        <Box sx={infoWrapper}>
          <Box sx={imgContainer}>
            <CardMedia
              sx={productCardImg}
              component="img"
              src={dish?.imageUrl || `${process.env.PUBLIC_URL}/img/admin/addImgPlug.png`}
              alt={dish?.name || 'add new image'}
            />
            <Button sx={imgEditBtn} onClick={handleOpenWidget}>
              <EditIcon />
            </Button>
          </Box>
          <Box sx={formWrapper}>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema(partnerValidationNames)}
            >
              {({ values, isValid }) => (
                <Form>
                  <Box sx={inputsWrapper}>
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
                          value={dish ? dish?.restaurant_name : restaurant}
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
                      onClick={handleDoubleClick}
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
                          value={dish ? dish?.filterCategories : foodCategory}
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
                      onClick={handleDoubleClick}
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
                        onClick={handleDoubleClick}
                        multiline
                        maxRows={8}
                        readOnly={!isEditing}
                      />
                    ))}
                    <Field type="checkbox" name="isTrending">
                      {({ field }) => (
                        <FormControlLabel
                          control={(
                            <Checkbox
                              {...field}
                              icon={<RadioButtonUncheckedOutlinedIcon />}
                              checkedIcon={<CheckCircleOutlineOutlinedIcon />}
                              disabled={!isEditing}
                            />
                              )}
                          label="Trending"
                          labelPlacement="start"
                          sx={badge}
                          onClick={handleDoubleClick}
                        />
                      )}
                    </Field>

                    <Field type="checkbox" name="isHealthy">
                      {({ field }) => (
                        <FormControlLabel
                          control={(
                            <Checkbox
                              {...field}
                              icon={<RadioButtonUncheckedOutlinedIcon />}
                              checkedIcon={<CheckCircleOutlineOutlinedIcon />}
                              disabled={!isEditing}
                            />
                              )}
                          label="Healthy"
                          labelPlacement="start"
                          sx={badge}
                          onClick={handleDoubleClick}
                        />
                      )}
                    </Field>

                    <Field type="checkbox" name="isSupreme">
                      {({ field }) => (
                        <FormControlLabel
                          control={(
                            <Checkbox
                              {...field}
                              icon={<RadioButtonUncheckedOutlinedIcon />}
                              checkedIcon={<CheckCircleOutlineOutlinedIcon />}
                              disabled={!isEditing}
                            />
                              )}
                          label="Supreme"
                          labelPlacement="start"
                          sx={badge}
                          onClick={handleDoubleClick}
                        />
                      )}
                    </Field>
                    {isEditing && (
                      <Box sx={btnsWrapper}>
                        <Button
                          type="button"
                          variant="outlined"
                          sx={{ ...btn, ...outlinedBtnStyles }}
                          disableRipple
                          onClick={cancelEditForm}
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
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      )}
    </Box>
  );
};

AddEditProductForm.propTypes = {
  dish: PropTypes.object,
  isEditing: PropTypes.bool,
  setIsEditing: PropTypes.func,
};

AddEditProductForm.defaultProps = {
  dish: {},
  isEditing: false,
  setIsEditing: () => {},
};

export default AddEditProductForm;
