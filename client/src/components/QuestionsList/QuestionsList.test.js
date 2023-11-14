import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import QuestionsList from './QuestionsList';

describe('QuestionsList Component', () => {
  test('should QuestionsList render', () => {
    const { asFragment } = render(<QuestionsList />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('toggles answer visibility when clicking on question', () => {
    render(<QuestionsList />);
    const questionElement = screen.getByText('How does your food delivery service work?');
    const ulElement = questionElement.parentNode;
    const buttonElement = ulElement.nextSibling;

    fireEvent.click(buttonElement);

    const updatedAnswerElement = screen.getByText('Our food delivery service allows you to order meals from restaurants through our platform, and we deliver them to your doorstep for your convenience.');
    expect(updatedAnswerElement).toBeVisible();
  });
});
