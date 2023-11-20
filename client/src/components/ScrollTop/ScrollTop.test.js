import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { useScrollTrigger } from '@mui/material';
import ScrollTop from "./ScrollTop";

describe('ScrollTop component', () => {
  test('should render ScrollTop component', () => {
    const { asFragment } = render(<ScrollTop />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('ScrollTop component should scroll back to top when clicked', () => {
    render(<ScrollTop />);

    const scrollButton = screen.getByLabelText('scroll back to top');

    fireEvent.click(scrollButton);
  
    expect(window.scrollY).toBe(0);
  });
})