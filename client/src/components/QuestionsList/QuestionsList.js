import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const QuestionsList = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState({});

  const getAnswer = (elem) => {
    setIsOpen((prev) => ({ ...prev, [elem]: !prev[elem] }));
  };

  const questions = [
    {
      question: 'How long does delivery take?',
      answer: 'You Can Get Information By Contacting Our Support Team Have 24/7 Service. What is The Difference Between Free And Paid Plan ?',
    },
    {
      question: 'How Does It Work?',
      answer: 'Our food delivery service works by allowing you to select meals from restaurants through our platform, place an order, make a payment, and have the food delivered to your location, providing a convenient dining experience.',
    },
    {
      question: 'How does your food delivery service work?',
      answer: 'Our food delivery service allows you to order meals from restaurants through our platform, and we deliver them to your doorstep for your convenience.',
    },
    {
      question: 'What payment options do you accept?',
      answer: 'We accept a variety of payment options, including credit/debit cards, digital wallets, and cash on delivery.',
    },
    {
      question: 'Do you offer discounts or promotions?',
      answer: 'Yes, we frequently offer discounts and promotions on selected restaurants and menu items to provide cost savings for our customers.',
    },
  ];

  return (
    <Container sx={{ mb: { mobile: 8, tablet: 12, desktop: 18 } }}>
      <Divider sx={{ mb: 12 }} />
      <Typography variant="h5" componet="h5" sx={{ textAlign: 'center', mb: { mobile: '67px', desktop: '78px' } }}>
        <h5>Frequently Asked</h5>
        <h5 style={{ color: theme.palette.primary.main }}>Questions</h5>
      </Typography>
      <List>
        {questions.map((item) => (
          <div key={item.question}>
            <ListItem disablePadding sx={{ pb: 5 }}>
              <ListItemText primary={<Typography variant="h3">{item.question}</Typography>} />
              <IconButton onClick={() => getAnswer(item.question)}>
                {!isOpen[item.question] ? <AddCircleIcon edge="end" sx={{ color: 'primary.main' }} /> : <RemoveCircleIcon edge="end" sx={{ color: 'primary.main' }} />}
              </IconButton>
            </ListItem>
            {isOpen[item.question] && (
              <ListItem disablePadding sx={{ pb: 5 }}>
                <ListItemText primary={<Typography variant="h3" fontWeight={400}>{item.answer}</Typography>} />
              </ListItem>
            )}
            <Divider sx={{ my: 1 }} />
          </div>
        ))}
      </List>
    </Container>
  );
};

export default QuestionsList;
