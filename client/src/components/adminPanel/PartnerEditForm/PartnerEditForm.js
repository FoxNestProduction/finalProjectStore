import React, { memo } from 'react';
import { Formik, Form } from 'formik';
import { Box, Button } from '@mui/material';
import PropTypes from 'prop-types';
import getValidationSchema from './validationSchema';
import {
  flexcenter,
  inputsWrapper,
  saveBtn,
} from './styles';
import Input from '../../inputs/Input/Input';
import { DESCRIPTION } from '../constants';

const PartnerEditForm = ({ restaurant }) => {
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
                sx={{
                  ...flexcenter,
                  ...inputsWrapper,
                }}
              >
                <Input
                  name="name"
                  id="editRestaurantName"
                  label="Name"
                  bgColor="common.white"
                  styles={{
                    fontWeight: '500',
                  }}
                  readOnly
                />
                <Input
                  name="address"
                  id="editRestaurantAddress"
                  label="Address"
                  bgColor="common.white"
                  styles={{
                    fontWeight: '500',
                  }}
                  readOnly
                />
                {Object.keys(description).map((lang) => (
                  <Input
                    key={lang}
                    name={`${DESCRIPTION}${lang}`}
                    id={`editRestaurantDescription${lang}`}
                    label={`Description in ${lang.toUpperCase()}`}
                    bgColor="common.white"
                    styles={{
                      fontWeight: '500',
                    }}
                    multiline
                    maxRows={8}
                    readOnly
                  />
                ))}
              </Box>
              <Button
                disableRipple
                variant="contained"
                sx={saveBtn}
                type="submit"
                disabled={!isValid}
              >
                Save
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

PartnerEditForm.propTypes = {
  restaurant: PropTypes.object,
};

PartnerEditForm.defaultProps = {
  restaurant: {},
};

export default memo(PartnerEditForm);
