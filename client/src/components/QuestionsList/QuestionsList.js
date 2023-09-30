import React from 'react';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { ListItem, ListItemText } from '@mui/material';

const QuestionsList = () => {
  const theme = useTheme();
  const questions = [
    {
      question: 'How long does delivery take?',
      answer: 'You Can Get Information By Contacting Our Support Team Have 24/7 Service. What is The Difference Between Free And Paid Plan ?',
    },
    {
      question: 'How Does It Work?',
      answer: 'Для додавання товару до кошика перейдіть на сторінку каталогу, знайдіть потрібний товар  натисніть кнопку',
    },
    {
      question: 'How does your food delivery service work?',
      answer: 'Для додавання товару до кошика перейдіть на сторінку каталогу, знайдіть потрібний товар натисніть кнопку Додати до кошика',
    },
    {
      question: 'What payment options do you accept?',
      answer: 'Для додавання товару до кошика перейдіть на сторінку каталогу, знайдіть потрібний товар nf натисніть кнопку Додати до кошика',
    },
    {
      question: 'Do you offer discounts or promotions?',
      answer: 'Для додавання товару до кошика перейдіть на сторінку каталогу, знайдіть потрібний товар  натисніть кнопку Додати до кошика',
    },
  ];

  return (
    <Container>
      <Divider sx={{ mb: 12 }} />
      <Typography variant="h5" componet="h5" sx={{ textAlign: 'center', mb: { mobile: '67px', desktop: '78px' } }}>
        <h5>Frequently Asked</h5>
        <h5 style={{ color: theme.palette.primary.main }}>Questions</h5>
      </Typography>
      <List>
        {questions.map((item) => (
          <ListItem>
            <ListItemText>{item.question}</ListItemText>
            <Divider />
          </ListItem>
        ))}
      </List>

    </Container>
  );
};

export default QuestionsList;
