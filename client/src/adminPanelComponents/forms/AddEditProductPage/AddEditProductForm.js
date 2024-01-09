import React, { memo, useEffect, useMemo, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import CardMedia from '@mui/material/CardMedia';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import {
  cardImgWrapper,
  formWrapper,
  infoWrapper,
  partnerCardImg,
  btn,
  btnsWrapper,
  input,
  inputsWrapper,
} from '../EditPartnerForm/styles';
import Input from '../../../components/inputs/Input/Input';
import { containedBtnStyles, outlinedBtnStyles } from '../../../muiTheme/buttonsStyles';
import useGetAPI from '../../../customHooks/useGetAPI';
import SelectForFormik from '../../../components/inputs/Select/Select';
import { DESCRIPTION } from '../../constants';

const AddEditProductForm = ({ item, isEditing, setIsEditing }) => {
  console.log(item);
  const [restaurant, setRestaurant] = useState('');
  const [foodCategory, setFoodCategory] = useState('');
  const [checkedList, setCheckedList] = useState({
    isTrending: false,
    isHealthy: false,
    isSupreme: false,
  });

  const [imageUrl, setImageUrl] = useState('');
  const [prevImageUrl, setPrevImageUrl] = useState('');

  useEffect(() => {
    if (item) {
      setRestaurant(item.restaurant_name);
      setFoodCategory(item.filterCategories);
      setCheckedList({
        isTrending: item.isTrending,
        isHealthy: item.isHealthy,
        isSupreme: item.isSupreme,
      });
    }
  }, [item]);

  const description = !item ? null : item.description;

  const descriptionsObj = useMemo(() => {
    return description || { ua: '', pl: '', en: '' };
  }, [description]);

  const productValidationNames = useMemo(() => {
    return Object.entries(descriptionsObj).map(([lang]) => `${DESCRIPTION}${lang}`);
  }, [descriptionsObj]);

  const descriptionArr = useMemo(() => (Object.entries(descriptionsObj).map(([lang, value]) => {
    return [`${DESCRIPTION}${lang}`, value];
  })), [descriptionsObj]);

  const descriptionInitialValues = Object.fromEntries(descriptionArr);

  const [partners] = useGetAPI('/partners/names');
  const [categories] = useGetAPI('/products/categories');

  const initialValues = {
    restaurant: '',
    name: item ? item.name : '',
    category: '',
    price: item ? item.currentPrice : '',
    ...descriptionInitialValues,
    isTrending: item ? item.isTrending : false,
    isHealthy: item ? item.isHealthy : false,
    isSupreme: item ? item.isSupreme : false,
  };

  const handleSubmit = async (values) => {
    // console.log(values);
    // const { name, address } = values;

    // const descriptionInDiffLangs = {};
    // Object.keys(values).forEach((key) => {
    //   if (key.startsWith(DESCRIPTION)) {
    //     const lang = key.replace(DESCRIPTION, '').toLowerCase();
    //     descriptionInDiffLangs[lang] = values[key].trim();
    //   }
    // });
    // const body = {
    //   name,
    //   address,
    //   description: {
    //     ...descriptionInDiffLangs,
    //   },
    // };
    // console.log(body);
  };

  const handleInputDoubleClick = (e) => {
    if (e.detail === 2) {
      setIsEditing(true);
      e.target.focus();
    }
  };

  const handleChangeCheckbox = (element) => {
    setCheckedList((prev) => ({
      ...prev,
      [element]: !prev[element],
    }));
  };

  return (
    <Box sx={infoWrapper}>
      <Box sx={cardImgWrapper}>
        <CardMedia
          component="img"
          src={!item ? './img/admin/addImgPlug.png' : item.imageUrl}
          alt={!item ? 'add new image' : item.name}
          sx={partnerCardImg}
        />
      </Box>
      <Box sx={formWrapper}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          // validationSchema={getValidationSchema(productValidationNames)}
          validationSchema={initialValues}
        >
          {({ isValid }) => (
            <Form>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                width: '100%',
              }}
              >
                <Box
                  sx={inputsWrapper}
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
                    id="productName"
                    label="Name"
                    bgColor={isEditing ? 'common.white' : undefined}
                    styles={input}
                    readOnly={!isEditing}
                    value={item ? item.name : ''}
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
                    name="price"
                    id="productPrice"
                    label="Price"
                    bgColor={isEditing ? 'common.white' : undefined}
                    styles={input}
                    readOnly={!isEditing}
                    value={item ? item.currentPrice : ''}
                    onClick={handleInputDoubleClick}
                  />
                  {/* {Object.keys(descriptionsObj).map((lang) => (
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
                  ))} */}
                  <Input
                    name="descriptionEn"
                    id="descriptionEn"
                    label="Description (EN)"
                    bgColor={isEditing ? 'common.white' : undefined}
                    styles={input}
                    onClick={handleInputDoubleClick}
                    multiline
                    maxRows={8}
                    readOnly={!isEditing}
                    value={item ? item?.description?.en : ''}
                  />
                  <Input
                    name="descriptionPl"
                    id="descriptionPl"
                    label="Description (PL)"
                    bgColor={isEditing ? 'common.white' : undefined}
                    styles={input}
                    onClick={handleInputDoubleClick}
                    multiline
                    maxRows={8}
                    readOnly={!isEditing}
                    value={item ? item?.description?.pl : ''}
                  />
                  <Input
                    name="descriptionUa"
                    id="descriptionUa"
                    label="Description (UA)"
                    bgColor={isEditing ? 'common.white' : undefined}
                    styles={input}
                    onClick={handleInputDoubleClick}
                    multiline
                    maxRows={8}
                    readOnly={!isEditing}
                    value={item ? item?.description?.ua : ''}
                  />
                  <FormControlLabel
                    control={(
                      <Checkbox
                        disableRipple
                        icon={<RadioButtonUncheckedOutlinedIcon />}
                        checkedIcon={<CheckCircleOutlineOutlinedIcon />}
                        onClick={() => handleChangeCheckbox('isTrending')}
                        defaultChecked={item ? item.isTrending : checkedList.isTrending}
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
                </Box>
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
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

AddEditProductForm.propTypes = {
  item: PropTypes.object,
  isEditing: PropTypes.bool,
  setIsEditing: PropTypes.func,
};

AddEditProductForm.defaultProps = {
  item: {},
  isEditing: false,
  setIsEditing: () => {},
};

export default memo(AddEditProductForm);
