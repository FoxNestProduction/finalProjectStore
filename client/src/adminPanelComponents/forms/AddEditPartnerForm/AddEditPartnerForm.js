import React, { memo, useMemo, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Box, Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { useNavigate } from 'react-router';
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
  inputsWrapper, editIconBtn, badge,
} from './styles';
import Input from '../../../components/inputs/Input/Input';
import { DESCRIPTION } from '../../constants';
import { containedBtnStyles, outlinedBtnStyles } from '../../../muiTheme/buttonsStyles';
import EditIcon from '../../../assets/svgComponents/EditIcon';
import { fetchAddNewPartner, fetchUpdatePartner } from '../../../redux/slices/partnersSlice';
import { paymentRadioBtn, paymentWrapper } from '../../../components/forms/CheckoutForm/styles';

const AddEditPartnerForm = ({ partner, isEditing, setIsEditing }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* ----- dynamic creation of textareas for description depending on
           the quantity of languages available */
  const description = useMemo(() => partner?.description || { uk: '', pl: '', en: '' }, [partner]);

  const partnerValidationNames = useMemo(() => {
    return Object.entries(description).map(([lang]) => `${DESCRIPTION}${lang}`);
  }, [description]);

  const descriptionArr = useMemo(() => (Object.entries(description).map(([lang, value]) => {
    return [`${DESCRIPTION}${lang}`, value];
  })), [description]);

  console.log(partner);

  const initialValues = {
    name: partner?.name ?? '',
    address: partner?.address ?? '',
    ...Object.fromEntries(descriptionArr),
    isTrending: partner?.isTrending ?? false,
    isHealthy: partner?.isHealthy ?? false,
    isSupreme: partner?.isSupreme ?? false,
  };

  // ------- upload img to cloudinary functionality -------
  const [imageUrl, setImageUrl] = useState(() => partner?.imageUrl || '');

  const cloudName = 'dvtjgmpnr';
  const uploadPreset = 'nggr2j5w';
  const uwConfig = {
    cloudName,
    uploadPreset,
    folder: 'EatlyProject/restaurants',
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

  // ------- open editing by double click on inputs -------
  const handleInputDoubleClick = (e) => {
    if (e.detail === 2) {
      setIsEditing(true);
      e.target.focus();
    }
  };

  const handleSubmit = async (values) => {
    console.log('values', values);

    const descriptionInDiffLangs = {};
    const otherValues = {};

    Object.keys(values).forEach((key) => {
      if (key.startsWith(DESCRIPTION)) {
        const lang = key.replace(DESCRIPTION, '').toLowerCase();
        descriptionInDiffLangs[lang] = values[key].trim();
      } else {
        otherValues[key] = values[key];
      }
    });
    const body = {
      description: {
        ...descriptionInDiffLangs,
      },
      ...otherValues,
      imageUrl: imageUrl || partner.imageUrl,
      enabled: partner?.enabled ?? false,
    };
    console.log('body', body);

    if (!partner) {
      const data = await dispatch(fetchAddNewPartner(body)).unwrap();
      if (data.success) {
        console.log(data);
        // TODO: alert 'Partner was successfully added'
        navigate(`/admin-panel/partners/${data.partner.customId}`);
      }
    } else {
      dispatch(fetchUpdatePartner({ customId: partner.customId, body }));
      // TODO: alert 'Changes accepted'
    }
  };

  return (
    <Box sx={infoWrapper}>
      <Box sx={cardImgWrapper}>
        <CardMedia
          component="img"
          src={imageUrl || '/img/admin/addImgPlug.png'}
          alt={partner ? partner.name : 'add new image'}
          sx={partnerCardImg}
        />
        {isEditing && (
        <IconButton
          sx={editIconBtn}
          onClick={() => handleOpenWidget()}
        >
          <EditIcon />
        </IconButton>
        )}
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
                  {Object.keys(description).map((lang) => (
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
                      />
                    )}
                  </Field>

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
                      setImageUrl(partner?.imageUrl || '');
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
                    disabled={!isValid || !imageUrl}
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
