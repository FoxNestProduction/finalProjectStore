import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import RestaurantItem from './RestaurantItem';

describe('RestaurantItem', () => {
  test('renders RestaurantItem component', () => {
    const props = {
      rating: 4,
      name: 'Test Restaurant',
      imageUrl: 'https://https://osvitanova.com.ua/ckeditor_assets/pictures/6254/content_1.jpg',
      isHealthy: true,
      isTrending: false,
      isSupreme: true,
      customId: '123',
    };

    const { asFragment } = render(
      <Router>
        <RestaurantItem {...props} />
      </Router>,
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText('Test Restaurant')).toBeInTheDocument();
    expect(screen.getByText('24min •')).toBeInTheDocument();
    expect(screen.getByAltText('Test Restaurant')).toHaveAttribute('src', 'https://https://osvitanova.com.ua/ckeditor_assets/pictures/6254/content_1.jpg');
  });
});
