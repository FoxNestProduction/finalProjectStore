import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import RestaurantCard from './RestaurantCard';

describe('RestaurantCard', () => {
  test('renders RestaurantCard component', () => {
    const props = {
      rating: 4,
      name: 'Test Restaurant',
      imageUrl: 'https://https://osvitanova.com.ua/ckeditor_assets/pictures/6254/content_1.jpg',
      description: '123',
      styleWidth: { mobile: '100%', lgTablet: '50%' },
    };

    const { asFragment } = render(
      <Router>
        <RestaurantCard {...props} />
      </Router>,
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText('Test Restaurant')).toBeInTheDocument();
    expect(screen.getByText('24min •')).toBeInTheDocument();
    expect(screen.getByAltText('Test Restaurant')).toHaveAttribute('src', 'https://https://osvitanova.com.ua/ckeditor_assets/pictures/6254/content_1.jpg');

    expect(screen.getByText('Show more')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Show more'));

    expect(screen.getByText('123')).toBeInTheDocument();

    expect(screen.getByText('Close')).toBeInTheDocument();
  });
});
