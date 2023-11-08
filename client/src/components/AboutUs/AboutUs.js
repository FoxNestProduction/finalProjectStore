/* eslint-disable max-len */
import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';

const AboutUs = () => {
  return (
    <Container xs={{ pb: '20px' }}>
      <Typography variant="h3" sx={{ mt: '30px', pl: '10px' }} gutterBottom>
        About Us
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
              Our Story
            </Typography>
            <Typography>
              Welcome to Eatly, your destination for delicious dining experiences! We are passionate about connecting food lovers
              with the best restaurants in town. Our journey began with a simple idea: to make it easier for people to discover
              and enjoy great food. We believe that every meal is an opportunity to create wonderful memories, and we&apos;re here
              to make those moments special.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
              Our Mission
            </Typography>
            <Typography>
              At Eatly, our mission is to provide a seamless and delightful dining experience. We work tirelessly to bring you a
              diverse selection of restaurants, each with its own unique flavors and culinary traditions. Whether you&apos;re
              craving comfort food, international cuisine, or something in between, we&apos;ve got you covered. We&apos;re
              committed to helping you explore new tastes and create unforgettable food adventures.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
              Our Team
            </Typography>
            <Typography>
              Our dedicated team of food enthusiasts and tech experts is at the heart of everything we do. We&apos;re passionate
              about curating the best dining options for you, ensuring that every restaurant we partner with meets our high
              standards of quality and service. Your satisfaction is our top priority, and we&apos;re here to assist you every
              step of the way.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
              Contact Us
            </Typography>
            <Typography>
              If you have any questions, feedback, or inquiries, don&apos;t hesitate to reach out to us. We&apos;d love to hear
              from you and assist with any requests. You can contact us at info@eatly.com or through our customer support page.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutUs;
