import React, { memo } from 'react';
import { Box, MenuItem, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { stylesSortSelect } from '../ListItems/styles';
import { setFilterParams } from '../../redux/slices/filterSlice';

const Sorter = ({ type, admin }) => {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();

  const filterParams = useSelector((state) => state.filter.filterParams, shallowEqual);

  const setSelectedValue = (sort) => {
    switch (sort) {
      case '+currentPrice': return 'Price UP';
      case '-currentPrice': return 'Price DOWN';
      case '+rating': return 'Rating UP';
      case '-rating': return 'Rating DOWN';
      case 'all': return 'All';
      case 'active': return 'Active';
      case 'disabled': return 'Disabled';
      default: return admin ? 'All' : 'Default';
    }
  };

  let currencies;

  if (type === 'partners') {
    currencies = [
      {
        value: 'Rating UP',
        label: {
          en: 'Rating UP',
          uk: 'Рейтингом, від найменшого',
          pl: 'Rating UP',
        },
      },
      {
        value: 'Rating DOWN',
        label: {
          en: 'Rating DOWN',
          uk: 'Рейтингом, від найвищого',
          pl: 'Rating DOWN',
        },
      },
      {
        value: 'Default',
        label: {
          en: 'Default',
          uk: 'Замовчуванням',
          pl: 'Default',
        },
      },
    ];
  } else {
    currencies = [
      {
        value: 'Price UP',
        label: {
          en: 'Price UP',
          uk: 'Ціною, від найнижчої',
          pl: 'Price UP',
        },
      },
      {
        value: 'Price DOWN',
        label: {
          en: 'Price DOWN',
          uk: 'Ціною, від найвищої',
          pl: 'Price DOWN',
        },
      },
      {
        value: 'Rating UP',
        label: {
          en: 'Rating UP',
          uk: 'Рейтингом, від найнижчого',
          pl: 'Rating UP',
        },
      },
      {
        value: 'Rating DOWN',
        label: {
          en: 'Rating DOWN',
          uk: 'Рейтингом, від найвищого',
          pl: 'Rating DOWN',
        },
      },
      {
        value: 'Default',
        label: {
          en: 'Default',
          uk: 'Замовчуванням',
          pl: 'Default',
        },
      },
    ];
  }

  if (admin) {
    currencies = [
      {
        value: 'All',
        label: {
          en: 'All',
          uk: 'Всі',
          pl: 'All',
        },
      },
      {
        value: 'Active',
        label: {
          en: 'Active',
          uk: 'Активні',
          pl: 'Active',
        },
      },
      {
        value: 'Disabled',
        label: {
          en: 'Disabled',
          uk: 'Деактивовані',
          pl: 'Disabled',
        },
      },
    ];
  }

  const handleSelectChangeSortBy = (event) => {
    switch (event.target.value) {
      case 'Price UP':
        dispatch(setFilterParams({ sort: '+currentPrice' }));
        break;

      case 'Price DOWN':
        dispatch(setFilterParams({ sort: '-currentPrice' }));
        break;

      case 'Rating UP':
        dispatch(setFilterParams({ sort: '+rating' }));
        break;

      case 'Rating DOWN':
        dispatch(setFilterParams({ sort: '-rating' }));
        break;

      case 'All':
        dispatch(setFilterParams({ sort: 'all' }));
        break;

      case 'Active':
        dispatch(setFilterParams({ sort: 'active' }));
        break;

      case 'Disabled':
        dispatch(setFilterParams({ sort: 'disabled' }));
        break;

      default:
        dispatch(setFilterParams({ sort: '' }));
    }

    dispatch(
      setFilterParams({
        startPage: 1,
      }),
    );
  };

  return (
    <Box sx={{ width: '100%', height: '40px', mb: '40px', paddingRight: '30px', textAlign: 'end' }}>
      <TextField
        sx={stylesSortSelect}
        id="standard-select-currency"
        size="small"
        select
        label={!admin ? t('sorter.label') : t('sorter.labelAdmin')}
        // label={t('sorter.label')}
        defaultValue=""
        variant="standard"
        value={setSelectedValue(filterParams.sort)}
        onChange={handleSelectChangeSortBy}
      >
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label[i18n.language]}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

Sorter.propTypes = {
  type: PropTypes.string,
  admin: PropTypes.bool,
};

Sorter.defaultProps = {
  type: '',
  admin: false,
};

export default memo(Sorter);
