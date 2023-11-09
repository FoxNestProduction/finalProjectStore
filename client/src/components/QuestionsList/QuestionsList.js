import React, { memo, useCallback, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

/* eslint-disable max-len */

const QuestionsList = () => {
  const [isOpen, setIsOpen] = useState({});

  const getAnswer = useCallback((elem) => {
    setIsOpen((prev) => ({ ...prev, [elem]: !prev[elem] }));
  }, []);

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
    <Container
      component="section"
      sx={{ mb: { mobile: 8, tablet: 12, desktop: 18 } }}
    >
      {/* <Divider sx={{ mb: 12 }} /> */}
      <Typography variant="h5" component="h3" color="text.primary" sx={{ textAlign: 'center', mb: { mobile: '67px', desktop: '78px' } }}>
        Frequently Asked
        <br />
        Questions
      </Typography>
      <List>
        {questions.map((item) => (
          <ListItem disablePadding key={item.question} sx={{ display: 'block' }}>
            <List disablePadding>
              <ListItem disablePadding sx={{ pb: 3 }}>
                <ListItemText
                  primary={<Typography variant="h3" component="h5" color="text.primary">{item.question}</Typography>}
                />
                <IconButton onClick={() => getAnswer(item.question)}>
                  {!isOpen[item.question]
                    ? <AddCircleIcon edge="end" sx={{ color: 'primary.main' }} />
                    : <RemoveCircleIcon edge="end" sx={{ color: 'primary.main' }} />}
                </IconButton>
              </ListItem>
              {isOpen[item.question] && (
              <ListItem disablePadding sx={{ pb: 5, width: '80%' }}>
                <ListItemText
                  primary={<Typography variant="description" fontWeight={400}>{item.answer}</Typography>}
                />
              </ListItem>
              )}
            </List>
            <Divider sx={{ my: 1 }} />
          </ListItem>
        ))}
      </List>

    </Container>
  );
};

export default memo(QuestionsList);
