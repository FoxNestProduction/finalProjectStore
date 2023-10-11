export const btn = {
  p: '12px',
  borderRadius: '16px',
  width: {
    mobile: '140px',
    tablet: '150px',
    desktop: '170px',
  },
  fontSize: {
    tablet: '18px',
    desktop: '24px',
  },
};

export const continueBtn = {
  color: 'text.primaryLight',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  ':hover': {
    backgroundColor: 'primary.hover',
  },
};

export const backBtn = {
  mr: '20px',
  color: 'text.primary',
  border: 1,
  transition: 'background-color 0.3s ease, color 0.3s ease',
  ':hover': {
    backgroundColor: 'primary.hover',
    color: 'text.primaryLight',
  },
};
