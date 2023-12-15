import React, { memo, useMemo } from 'react';
import { Formik, Form } from 'formik';
import { Box, Button } from '@mui/material';
import PropTypes from 'prop-types';
import getValidationSchema from './validationSchema';
import {
  btn,
  btnsWrapper,
  input,
  inputsWrapper,
} from './styles';
import Input from '../../inputs/Input/Input';
import { DESCRIPTION } from '../constants';
import { btnStyles, containedBtnStyles, outlinedBtnStyles } from '../../../muiTheme/buttonsStyles';

const PartnerEditForm = ({ restaurant, isEditing, setIsEditing }) => {
  const { name, address, description } = restaurant;

  const partnerValidationNames = useMemo(() => {
    return Object.entries(description).map(([lang]) => `${DESCRIPTION}${lang}`);
  }, [description]);

  const descriptionArr = useMemo(() => (Object.entries(description).map(([lang, value]) => {
    return [`${DESCRIPTION}${lang}`, value];
  })), [description]);

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

  const handleInputDoubleClick = (e) => {
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
                  bgColor={isEditing ? 'common.white' : undefined}
                  styles={input}
                  readOnly={!isEditing}
                  onClick={handleInputDoubleClick}
                />
                <Input
                  name="address"
                  id="editRestaurantAddress"
                  label="Address"
                  bgColor={isEditing ? 'common.white' : undefined}
                  styles={input}
                  readOnly={!isEditing}
                  onClick={handleInputDoubleClick}
                />
                {Object.keys(description).map((lang) => (
                  <Input
                    key={lang}
                    name={`${DESCRIPTION}${lang}`}
                    id={`editRestaurantDescription${lang}`}
                    label={`Description in ${lang.toUpperCase()}`}
                    bgColor={isEditing ? 'common.white' : undefined}
                    styles={input}
                    onClick={handleInputDoubleClick}
                    // multiline
                    // maxRows={8}
                    readOnly={!isEditing}
                  />
                ))}
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
