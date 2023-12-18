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

const EditPartnerForm = ({ partner, isEditing, setIsEditing }) => {
  const { name, address, description } = partner;

  const descriptionsObj = useMemo(() => {
    return partner ? description : { ua: '', pl: '', en: '' };
  }, [partner, description]);

  const partnerValidationNames = useMemo(() => {
    return Object.entries(descriptionsObj).map(([lang]) => `${DESCRIPTION}${lang}`);
  }, [descriptionsObj]);

  const descriptionArr = useMemo(() => (Object.entries(descriptionsObj).map(([lang, value]) => {
    return [`${DESCRIPTION}${lang}`, value];
  })), [descriptionsObj]);

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
    <Box sx={infoWrapper}>
      <Box sx={cardImgWrapper}>
        <CardMedia
          component="img"
          src={partner.imageUrl}
          alt={partner.name}
          sx={partnerCardImg}
        />
      </Box>
      <Box sx={formWrapper}>
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

EditPartnerForm.propTypes = {
  partner: PropTypes.object,
  isEditing: PropTypes.bool,
  setIsEditing: PropTypes.func,
};

EditPartnerForm.defaultProps = {
  partner: {},
  isEditing: false,
  setIsEditing: () => {},
};

export default memo(EditPartnerForm);
