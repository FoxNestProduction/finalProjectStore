export const MiniCartItemContainer = {
  display: 'flex',
  boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px -2px 1px -1px rgba(0,0,0,0.2), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  borderRadius: '0px',
  padding: '10px',
};

export const cartProductImg = {
  width: {
    tablet: '40px',
  },
  height: {
    tablet: '100%',
  },
  borderRadius: '0px',
};

export const textAndQuantityCardContent = {
  display: 'flex',
  width: '90%',
  justifyContent: 'space-between',
  gap: '5px',
};

export const cardTextContent = {
  '&:last-child': {
    padding: {
      lgTablet: '0 10px',
    },
  },
};

export const productName = {
  fontSize: {
    lgTablet: '12px',
  },
};

export const currentPriceStyles = {
  fontWeight: 'fontWeightSemiBold',
  fontSize: {
    lgTablet: '12px',
  },
};

export const buttonsWrapper = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  m: '5px 5px',
};

export const buttonStyles = {
  padding: {
    lgTablet: '0 5px',
  },
  borderRadius: '8px',
  minWidth: '32px !important',
};

export const roundedIcons = { fontSize: '1.2rem' };

export const quantityStyle = {
  border: '1px solid rgba(108, 095, 188, 0.5)',
  pt: '1px',
  fontWeight: 'fontWeightMedium',
  fontSize: {
    lgTablet: '14px',
  },
  width: '2rem',
  textAlign: 'center',
};
