import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
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
import { useDispatch, useSelector } from 'react-redux';
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

import { fetchAddNewProduct, fetchUpdateProduct } from '../../../redux/slices/productsSlice';
import { fetchGetPartner } from '../../../redux/slices/partnersSlice';

const AddEditProductForm = ({ dish, isEditing, setIsEditing }) => {
  const [restaurant, setRestaurant] = useState('');
  const [foodCategory, setFoodCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const isLoadingProduct = useSelector((state) => state.products.loading);
  const currentPartner = useSelector((state) => state.partners.currentEditingPartner);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customId } = useParams();

  const [partners] = useGetAPI('/partners/names');
  const [categories] = useGetAPI('/products/categories');

  const description = useMemo(() => (dish?.description || { uk: '', pl: '', en: '' }), [dish]);

  const cloudConfig = {
    cloudName: process.env.REACT_APP_CLOUD_NAME,
    uploadPreset: process.env.REACT_APP_UPLOAD_PRESSET,
    folder: `EatlyProject/products/${restaurant}`,
  };

  const handleOpenWidget = () => {
    // eslint-disable-next-line no-undef
    const myWidget = cloudinary.createUploadWidget(
      cloudConfig,
      (error, result) => {
        if (!error && result && result.event === 'success') {
          setImageUrl(result.info.secure_url);
        }
      },
    );
    myWidget.open();
  };

  useEffect(() => {
    dispatch(fetchGetPartner(customId));
  }, [dispatch, customId]);

  useEffect(() => {
    if (currentPartner) {
      setRestaurant(currentPartner.name);
      setFoodCategory(currentPartner.filterCategories);
    }
  }, [currentPartner]);

  const partnerValidationNames = useMemo(() => {
    return Object.entries(description).map(([lang]) => `${DESCRIPTION}${lang}`);
  }, [description]);

  const descriptionArr = useMemo(() => (Object.entries(description).map(([lang, value]) => {
    return [`${DESCRIPTION}${lang}`, value];
  })), [description]);

  const initialValues = {
    // restaurant_name: '',
    name: dish ? dish?.name : '',
    // category: '',
    currentPrice: dish ? dish?.currentPrice : '',
    ...Object.fromEntries(descriptionArr),
    isTrending: dish?.isTrending || false,
    isHealthy: dish?.isHealthy || false,
    isSupreme: dish?.isSupreme || false,
  };

  const handleSubmit = async (values) => {
    const descriptionInDiffLangs = {};
    const otherValues = {};

    Object.keys(values).forEach((key) => {
      if (key.startsWith(DESCRIPTION)) {
        const lang = key.replace(DESCRIPTION, '').toLowerCase();
        descriptionInDiffLangs[lang] = values[key].trim();
      } else {
        otherValues[key] = values[key]; // name, address, itTrending...
      }
    });

    const body = {
      description: {
        ...descriptionInDiffLangs,
      },
      restaurant_name: restaurant,
      filterCategories: foodCategory,
      ...otherValues,
      imageUrl: imageUrl || dish.imageUrl,
    };

    if (!dish) {
      const data = await dispatch(fetchAddNewProduct(body)).unwrap();
      if (data.success) {
        // TODO: alert 'Product added'
        navigate(`/admin-panel/partners/${customId}/dishes/${data.product.itemNo}`);
      }
    } else {
      dispatch(fetchUpdateProduct({ itemId: dish._id, body }));
      setIsEditing(false);
      // TODO: alert 'Changes accepted'
    }
  };

  const handleDoubleClick = (e) => {
    if (e.detail === 2) {
      setIsEditing(true);
      e.target.focus();
    }
  };

  return (
    <Box>
      {isLoadingProduct ? <Skeleton type="dish" /> : (
        <Box sx={infoWrapper}>
          <Box sx={imgContainer}>
            <CardMedia
              sx={productCardImg}
              component="img"
              src={dish?.imageUrl || imageUrl || `${process.env.PUBLIC_URL}/img/admin/addImgPlug.png`}
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
              {({ isValid, resetForm, initialValues: defaultValues }) => (
                <Form>
                  <Box sx={inputsWrapper}>
                    <FormControl sx={{ width: '100%' }}>
                      <InputLabel id="restaurant">Name restaurant</InputLabel>
                      {partners && (
                        <Field
                          name="restaurant_name"
                          label="Restaurant"
                          component={SelectForFormik}
                          labelId="restaurant_name"
                          id="restaurant_name"
                          bgColor="#FFF"
                          value={restaurant}
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
                          value={foodCategory}
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
                      name="currentPrice"
                      id="currentPrice"
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
                          onClick={() => {
                            resetForm({ values: defaultValues });
                            setImageUrl(dish?.imageUrl || '');
                            if (dish) setIsEditing(false);
                          }}
                        >
                          {dish ? 'Cancel' : 'Clear'}
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
