import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Features from "./Features";

describe('Features component', () => {
  test('should render Features component', () => {
    const { asFragment } = render(<Features />);
    expect(asFragment()).toMatchSnapshot();
  });

  // test('ScrollTop component should scroll back to top when clicked', () => {
  //   render(<ScrollTop />);

  //   const scrollButton = screen.getByLabelText('scroll back to top');

  //   fireEvent.click(scrollButton);
  
  //   expect(window.scrollY).toBe(0);
  // });
});