import { render } from '@testing-library/react';
import Footer from '../Footer/Footer';
import { MemoryRouter } from 'react-router';

const Component = (props) => {
  return (
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );
};

describe('Snapshot test', () => {
  test('should render Footer', () => {
    const { asFragment } = render(<Component />);

    expect(asFragment()).toMatchSnapshot();
  });
});
