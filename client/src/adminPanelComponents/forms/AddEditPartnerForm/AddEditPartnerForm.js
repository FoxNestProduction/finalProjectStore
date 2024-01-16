import React, { memo, useMemo } from 'react';
import { Formik, Form } from 'formik';
import { Box, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import CardMedia from '@mui/material/CardMedia';
import getValidationSchema from './validationSchema';
import {
  cardImgWrapper,
  dishCardImg,
  formWrapper,
  infoWrapper,
  partnerCardImg,
  btn,
  btnsWrapper,
  input,
  inputsWrapper,
} from './styles';
import Input from '../../../components/inputs/Input/Input';
import { DESCRIPTION } from '../../constants';
import { containedBtnStyles, outlinedBtnStyles } from '../../../muiTheme/buttonsStyles';

const AddEditPartnerForm = ({ partner, isEditing, setIsEditing }) => {
  const description = partner?.description || null;

  const descriptionsObj = useMemo(() => {
    return description || { ua: '', pl: '', en: '' };
  }, [description]);

  const partnerValidationNames = useMemo(() => {
    return Object.entries(descriptionsObj).map(([lang]) => `${DESCRIPTION}${lang}`);
  }, [descriptionsObj]);

  const descriptionArr = useMemo(() => (Object.entries(descriptionsObj).map(([lang, value]) => {
    return [`${DESCRIPTION}${lang}`, value];
  })), [descriptionsObj]);

  const descriptionInitialValues = Object.fromEntries(descriptionArr);

  const initialValues = {
    name: partner ? partner.name : '',
    address: partner ? partner.address : '',
    ...descriptionInitialValues,
  };

  const handleSubmit = async (values) => {
    console.log(values);
    const { name, address } = values;

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

  const handleClearInputs = () => {

  };

  return (
    <Box sx={infoWrapper}>
      <Box sx={cardImgWrapper}>
        <CardMedia
          component="img"
          src={partner ? partner.imageUrl : '/img/admin/addImgPlug.png'}
          alt={partner ? partner.name : 'add new image'}
          sx={partnerCardImg}
        />
      </Box>
      <Box sx={formWrapper}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={getValidationSchema(partnerValidationNames)}
        >
          {({ isValid, resetForm, initialValues: defaultValues }) => (
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
                    id="editPartnerName"
                    label="Name"
                    bgColor={isEditing ? 'common.white' : undefined}
                    styles={input}
                    readOnly={!isEditing}
                    onClick={handleInputDoubleClick}
                  />
                  <Input
                    name="address"
                    id="editPartnerAddress"
                    label="Address"
                    bgColor={isEditing ? 'common.white' : undefined}
                    styles={input}
                    readOnly={!isEditing}
                    onClick={handleInputDoubleClick}
                  />
                  {Object.keys(descriptionsObj).map((lang) => (
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
                </Box>
                {isEditing && (
                <Box sx={btnsWrapper}>
                  <Button
                    type="button"
                    variant="outlined"
                    sx={{ ...btn, ...outlinedBtnStyles }}
                    disableRipple
                    onClick={() => {
                      resetForm({ values: defaultValues });
                      if (partner) setIsEditing(false);
                    }}
                  >
                    {partner ? 'Cancel' : 'Clear'}
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

AddEditPartnerForm.propTypes = {
  partner: PropTypes.object,
  isEditing: PropTypes.bool,
  setIsEditing: PropTypes.func,
};

AddEditPartnerForm.defaultProps = {
  partner: {},
  isEditing: false,
  setIsEditing: () => {},
};

export default memo(AddEditPartnerForm);
