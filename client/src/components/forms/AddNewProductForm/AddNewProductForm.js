import { Box, Button, Checkbox, FormControl, FormControlLabel, Input, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import React from 'react';
import useGetAPI from '../../../customHooks/useGetAPI';

const AddNewProductForm = () => {
  const [partners, loading] = useGetAPI('/partners');
  console.log(partners);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: {
          mobile: '100%',
          tablet: 350,
          desktop: 526,
        },
        bgcolor: 'common.white',
        p: {
          desktop: 2,
        },
      }}
    >
      <Typography
        sx={{
          fontSize: {
            mobile: '26px',
            tablet: '28px',
            desktop: '36px',
          },
          mb: {
            mobile: '38px',
            tablet: '34px',
            desktop: '27px',
          },
          color: 'text.primary',
          textAlign: 'center',
          fontWeight: {
            mobile: 'fontWeightSemiBold',
            desktop: 'fontWeightMedium',
          },
        }}
      >
        Add new product
      </Typography>

      <Formik>
        <Form>
          <Box
            sx={{
              display: 'grid',
              width: '100%',
            }}
          >
            <FormControl
              variant="filled"
              fullWidth
              sx={{
                maxWidth: '70%',
              }}
            >
              <InputLabel id="restaurant">Select restaurant</InputLabel>
              <Select labelId="restaurant" label="Select restaurant">
                {partners && partners.map((el) => <MenuItem value={el.name}>{el.name}</MenuItem>)}
              </Select>
            </FormControl>
            <TextField label="Product name" variant="filled" />
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              multiline
              maxRows={4}
            />
            <FormControl variant="filled" fullWidth>
              <InputLabel id="price">Amount</InputLabel>
              <Input
                labelId="price"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
              />
            </FormControl>
            <FormControlLabel control={<Checkbox disableRipple />} label="Favourite" />
            <FormControlLabel control={<Checkbox disableRipple />} label="Supreme" />
            <FormControlLabel control={<Checkbox disableRipple />} label="Healthy" />
            <FormControlLabel control={<Checkbox disableRipple />} label="Trending" />
            <FormControl variant="filled" fullWidth>
              <InputLabel id="filter">Filter categories</InputLabel>
              <Select labelId="filter" label="Filter categories">
                {partners && partners.map((el) => (
                  <MenuItem value={el.filterCategories}>{el.filterCategories}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControlLabel control={<Checkbox />} label="Enabled" />
            <Button
              disableRipple
              variant="contained"
              // sx={submitBtn}
              sx={{
                width: '100%',
                color: 'text.primaryLight',
                mb: {
                  mobile: '19px',
                  tablet: '16px',
                  desktop: '24px',
                },
                height: {
                  mobile: '60px',
                  tablet: '53px',
                  desktop: '60px',
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
              // disabled={!isValid}
            >
              Add product
            </Button>
          </Box>
        </Form>
      </Formik>
    </Box>
  );
};

export default AddNewProductForm;
