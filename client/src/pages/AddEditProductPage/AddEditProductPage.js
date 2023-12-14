import React, { useState } from 'react';
import { useLocation } from 'react-router';
import {
  Box,
  Button,
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
import Textarea from '../../components/inputs/Textarea/Textarea';
import validationSchema from './validationSchema';
import { flexCenter, container } from './styles';

const AddEditProductPage = () => {
  const [partners, loadingPartners] = useGetAPI('/partners/names');
  const [categories, loadingCategories] = useGetAPI('/products/categories');

  console.log(partners);

  const { pathname } = useLocation();

  const initialValues = {
    name: '',
    price: '',
    descriptionEN: '',
    descriptionUA: '',
    descriptionPL: '',
  };

  const handleSubmit = (values) => console.log(values);

  return (
    <Container component="section">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          bgcolor: 'common.white',
          p: {
            desktop: 2,
          },
        }}
      >
        <Typography
          sx={container}
        >
          {pathname === '/menu/newProduct' && 'Add new dish'}
        </Typography>

        <Box>
          {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button>
              <Typography>{pathname === '/menu/newProduct' ? 'Disable' : 'Activate'}</Typography>
            </Button>
            <Button>
              <Edit />
            </Button>
          </Box> */}
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ isValid }) => (
              <Form style={{ width: '100%' }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', columnGap: '24px' }}>
                  <Box sx={{
                    position: 'relative',
                    border: '1px solid #1B1B1B',
                    borderRadius: '16px',
                    width: '506px',
                    height: '506px',
                    ...flexCenter,
                  }}
                  >
                    <SatelliteOutlinedIcon sx={{ fontSize: '346px' }} />
                    <Button sx={{
                      position: 'absolute',
                      top: '20px',
                      right: 0,
                      padding: 0,
                    }}
                    >
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
                      <Field
                        name="restaurant"
                        label="Restaurant"
                        component={SelectForFormik}
                        labelId="restaurant"
                        id="restaurant"
                        bgColor="#FFF"
                      >
                        {partners && partners.map((el) => (
                          <MenuItem key={el} value={el}>{el}</MenuItem>
                        ))}
                      </Field>
                    </FormControl>
                    <Input
                      name="name"
                      id="name_dish"
                      label="Name dish"
                      bgColor="#FFF"
                    />
                    <FormControl fullWidth>
                      <InputLabel id="checkout-city-label">Category</InputLabel>
                      <Field
                        name="category"
                        label="Category"
                        component={SelectForFormik}
                        labelId="category"
                        id="category"
                        bgColor="#FFF"
                      >
                        {categories && categories.map((el) => (
                          <MenuItem key={el} value={el}>{el}</MenuItem>
                        ))}
                      </Field>
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
                      sx={{
                        width: '188px',
                        height: '60px',
                        color: 'text.primaryLight',
                        mb: {
                          mobile: '19px',
                          tablet: '16px',
                          desktop: '24px',
                        },
                        transition: 'background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'primary.hover',
                          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                        },
                        '&:active': {
                          boxShadow: '0px -1px 4px rgba(0, 0, 0, 0.5)',
                          transform: 'translateY(1px)',
                          backgroundColor: 'common.white',
                          color: '#1C186C',
                          boxSizing: 'border-box',
                          border: '1px solid',
                          borderColor: 'primary.main',
                        },
                        fontSize: {
                          mobile: '14px',
                          desktop: '20px',
                        },
                        fontWeight: {
                          mobile: 'fontWeightSemiBold',
                          desktop: 'fontWeightRegular',
                        },
                        textTransform: {
                          mobile: 'capitalize',
                        },
                      }}
                      type="submit"
                      disabled={!isValid}
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
