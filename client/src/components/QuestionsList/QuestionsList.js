/* eslint-disable max-len */
import React, { memo, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useTranslation } from 'react-i18next';

const QuestionsList = () => {
  const [isOpen, setIsOpen] = useState({});
  const { i18n, t } = useTranslation();

  const getAnswer = (elem) => {
    setIsOpen((prev) => ({ ...prev, [elem]: !prev[elem] }));
  };

  const questions = [
    {
      question: {
        en: 'How long does delivery take?',
        uk: 'Скільки триває доставка?',
        pl: 'How long does delivery take?',
      },
      answer: {
        en: 'You Can Get Information By Contacting Our Support Team Have 24/7 Service.',
        uk: 'Ви можете отримати інформацію, зв’язавшись із нашою службою підтримки, яка працює цілодобово без вихідних.',
        pl: 'You Can Get Information By Contacting Our Support Team Have 24/7 Service.',
      },
    },
    {
      question: {
        en: 'How Does It Work?',
        uk: 'Як це працює?',
        pl: 'How Does It Work?',
      },
      answer: {
        en: 'Our food delivery service works by allowing you to select meals from restaurants through our platform, place an order, make a payment, and have the food delivered to your location, providing a convenient dining experience.',
        uk: 'Наша служба доставки їжі дозволяє вам обирати страви з ресторанів через нашу платформу, розміщувати замовлення, здійснювати оплату та замовляти доставку їжі до зручного вам місця, забезпечуючи зручний сервіс.',
        pl: 'Our food delivery service works by allowing you to select meals from restaurants through our platform, place an order, make a payment, and have the food delivered to your location, providing a convenient dining experience.',
      },
    },
    {
      question: {
        en: 'How does your food delivery service work?',
        uk: 'Як працює ваша служба доставки їжі?',
        pl: 'How does your food delivery service work?',
      },
      answer: {
        en: 'Our food delivery service allows you to order meals from restaurants through our platform, and we deliver them to your doorstep for your convenience.',
        uk: 'Наша служба доставки їжі дозволяє замовляти страви з ресторанів через нашу платформу, і ми доставляємо замовлення до вашого до зручного для вас місця.',
        pl: 'Our food delivery service allows you to order meals from restaurants through our platform, and we deliver them to your doorstep for your convenience.',
      },
    },
    {
      question: {
        en: 'What payment options do you accept?',
        uk: 'Які варіанти оплати ви приймаєте?',
        pl: 'What payment options do you accept?',
      },
      answer: {
        en: 'We accept a variety of payment options, including credit/debit cards, digital wallets, and cash on delivery.',
        uk: 'Ми приймаємо різноманітні варіанти оплати, включаючи кредитні/дебетові картки, цифрові гаманці та готівку при доставці.',
        pl: 'We accept a variety of payment options, including credit/debit cards, digital wallets, and cash on delivery.',
      },
    },
    {
      question: {
        en: 'Do you offer discounts or promotions?',
        uk: 'Чи пропонуєте ви знижки або акції?',
        pl: 'Do you offer discounts or promotions?',
      },
      answer: {
        en: 'Yes, we frequently offer discounts and promotions on selected restaurants and menu items to provide cost savings for our customers.',
        uk: 'Так, ми часто пропонуємо знижки та акції на вибрані ресторани та пункти меню, щоб заощадити кошти для наших клієнтів.',
        pl: 'Yes, we frequently offer discounts and promotions on selected restaurants and menu items to provide cost savings for our customers.',
      },
    },
  ];

  return (
    <Container
      component="section"
      sx={{ mb: { mobile: 8, tablet: 12, desktop: 18 } }}
    >
      {/* <Divider sx={{ mb: 12 }} /> */}
      <Typography variant="h5" component="h3" color="text.primary" sx={{ textAlign: 'center', mb: { mobile: '67px', desktop: '78px' } }}>
        {t('questions.title')}
        <br />
        {t('questions.title_1')}
      </Typography>
      <List>
        {questions.map((item) => (
          <ListItem disablePadding key={item.question[i18n.language]} sx={{ display: 'block' }}>
            <List disablePadding>
              <ListItem disablePadding sx={{ pb: 3 }}>
                <ListItemText
                  primary={<Typography variant="h3" component="h5" color="text.primary">{item.question[i18n.language]}</Typography>}
                />
                <IconButton onClick={() => getAnswer(item.question[i18n.language])}>
                  {!isOpen[item.question[i18n.language]]
                    ? <AddCircleIcon edge="end" sx={{ color: 'primary.main' }} />
                    : <RemoveCircleIcon edge="end" sx={{ color: 'primary.main' }} />}
                </IconButton>
              </ListItem>
              {isOpen[item.question[i18n.language]] && (
              <ListItem disablePadding sx={{ pb: 5, width: '80%' }}>
                <ListItemText
                  primary={<Typography variant="description" fontWeight={400}>{item.answer[i18n.language]}</Typography>}
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
