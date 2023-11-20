import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate, useLocation } from 'react-router-dom';
import SomethingWentWrong from './SomethingWentWrong';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

describe('SomethingWentWrong', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render SomethingWentWrong', () => {
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    const { asFragment } = render(
      <MemoryRouter>
        <SomethingWentWrong />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();

    const reloadButton = screen.getByText('Reload');

    expect(reloadButton).toBeInTheDocument();
  });
});
