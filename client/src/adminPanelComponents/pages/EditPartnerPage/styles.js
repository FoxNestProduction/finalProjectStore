export const TitleBtn = {
  backgroundColor: 'primary.main',
  color: 'text.primaryLight',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease',
  ':hover': {
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
  justifySelf: 'end',
};

export const linkStyles = {
  display: 'flex',
};
