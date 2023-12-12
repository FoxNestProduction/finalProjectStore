import React, { memo } from 'react';
import { Formik, Form } from 'formik';
import { Box, Button } from '@mui/material';
import PropTypes from 'prop-types';
import getValidationSchema from './validationSchema';
import {
  btnsWrapper,
  input,
  inputsWrapper,
  saveBtn,
} from './styles';
import Input from '../../inputs/Input/Input';
import { DESCRIPTION } from '../constants';

const PartnerEditForm = ({ restaurant, isEditing, setIsEditing }) => {
  const { name, address, description } = restaurant;

  let partnerValidationNames = []; // eslint-disable-line
  const descriptionArr = Object.entries(description).map((lang) => {
    partnerValidationNames.push(`${DESCRIPTION}${lang[0]}`);
    return [`${DESCRIPTION}${lang[0]}`, lang[1]];
  });

  const descriptionInitialValues = Object.fromEntries(descriptionArr);

  const initialValues = {
    name,
    address,
    ...descriptionInitialValues,
  };

  const handleSubmit = async (values) => {
    console.log(values);
    const descriptionInDiffLangs = {};

    Object.keys(values).forEach((key) => {
      if (key.startsWith(DESCRIPTION)) {
        const lang = key.replace(DESCRIPTION, '').toLowerCase();
        descriptionInDiffLangs[lang] = values[key].trim();
      }
    });
    const body = {
      name,
      address,
      description: {
        ...descriptionInDiffLangs,
      },
    };
    console.log(body);
  };

  const handleClick = (e) => {
    if (e.detail === 2) {
      setIsEditing(true);
      e.target.focus();
    }
  };

  return (
    <Box sx={{
      width: '100%',
    }}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={getValidationSchema(partnerValidationNames)}
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
                <Input
                  name="name"
                  id="editRestaurantName"
                  label="Name"
                  // bgColor="common.white"
                  bgColor={isEditing ? 'common.white' : undefined}
                  // styles={input}
                  styles={{
                    fontWeight: 'fontWeightMedium',
                    // fontWeight: `${isEditing ? 'fontWeightMedium' : 'fontWeightRegular'}`,
                    // color: `${isEditing ? 'text.primary' : 'text.header'}`,
                  }}
                  readOnly={!isEditing}
                  onClick={handleClick}
                />
                <Input
                  name="address"
                  id="editRestaurantAddress"
                  label="Address"
                  // bgColor="common.white"
                  bgColor={isEditing ? 'common.white' : undefined}
                  // styles={input}
                  styles={{
                    fontWeight: 'fontWeightMedium',
                    // fontWeight: `${isEditing ? 'fontWeightMedium' : 'fontWeightRegular'}`,
                    // color: `${isEditing ? 'text.primary' : 'text.header'}`,
                  }}
                  readOnly={!isEditing}
                  onClick={handleClick}
                />
                {Object.keys(description).map((lang) => (
                  <Input
                    key={lang}
                    name={`${DESCRIPTION}${lang}`}
                    id={`editRestaurantDescription${lang}`}
                    label={`Description in ${lang.toUpperCase()}`}
                    // bgColor="common.white"
                    bgColor={isEditing ? 'common.white' : undefined}
                    // styles={input}
                    styles={{
                      fontWeight: 'fontWeightMedium',
                      // fontWeight: `${isEditing ? 'fontWeightMedium' : 'fontWeightRegular'}`,
                      // color: `${isEditing ? 'text.primary' : 'text.secondary'}`,
                    }}
                    onClick={handleClick}
                    multiline
                    maxRows={8}
                    readOnly={!isEditing}
                  />
                ))}
              </Box>
              {isEditing && (
                <Box sx={btnsWrapper}>
                  <Button
                    type="button"
                    variant="outlined"
                    sx={saveBtn}
                    disableRipple
                    onClick={() => { setIsEditing(false); }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={saveBtn}
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
  );
};

PartnerEditForm.propTypes = {
  restaurant: PropTypes.object,
  isEditing: PropTypes.bool,
  setIsEditing: PropTypes.func,
};

PartnerEditForm.defaultProps = {
  restaurant: {},
  isEditing: false,
  setIsEditing: () => {},
};

export default memo(PartnerEditForm);
