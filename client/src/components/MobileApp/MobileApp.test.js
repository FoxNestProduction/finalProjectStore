import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MobileApp from './MobileApp';

window.open = jest.fn();

describe('MobileApp component', () => {
  test('should render MobileApp component', () => {
    const { asFragment } = render(
      <MobileApp />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('calls onClick with correct URL when Google Play button is clicked', () => {
    render(<MobileApp />);

    const googlePlayButton = screen.getByAltText('google play');

    fireEvent.click(googlePlayButton);

    expect(window.open).toHaveBeenCalledWith('https://play.google.com/', '_blank');

    window.open.mockRestore();
  });

  test('calls onClick with correct URL when App Store button is clicked', () => {
    render(<MobileApp />);

    const appStoreButton = screen.getByAltText('app store');

    fireEvent.click(appStoreButton);

    expect(window.open).toHaveBeenCalledWith('https://www.apple.com/ua/app-store/', '_blank');

    window.open.mockRestore();
  });
});
