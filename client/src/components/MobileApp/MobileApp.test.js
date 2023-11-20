import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MobileApp from "./MobileApp";

describe('MobileApp component', () => {
  test('should render MobileApp component', () => {
    const { asFragment } = render(
          <MobileApp />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('calls onClick with correct URL when Google Play button is clicked', () => {
    render(<MobileApp />);

    const googlePlayButton = screen.getByAltText('google play');
    const openSpy = jest.spyOn(window, 'open');

    fireEvent.click(googlePlayButton);

    expect(openSpy).toHaveBeenCalledWith('https://play.google.com/', '_blank');

    openSpy.mockRestore();
  })

  test('calls onClick with correct URL when App Store button is clicked', () => {
    render(<MobileApp />);

    const appStoreButton = screen.getByAltText('app store');
    const openSpy = jest.spyOn(window, 'open');

    fireEvent.click(appStoreButton);

    expect(openSpy).toHaveBeenCalledWith('https://www.apple.com/ua/app-store/', '_blank');

    openSpy.mockRestore();
  })
});