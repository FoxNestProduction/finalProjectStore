import { fireEvent, render } from "@testing-library/react";
import Sorter from '../Sorter/Sorter';
import { Provider} from "react-redux";
import store from "../../redux/store";



const Component = (props) => {
  return (
    <Provider store={store}>
      <Sorter/>
    </Provider>
  );
};

describe("Snapshot test", () => {
  test("should Sorter render", () => {
    const { asFragment } = render(<Component />);

    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Sorter Component', () => {
  test('Sorter handles select change and dispatches actions', async () => {
    const { findByLabelText, getByText } = render(<Component type = 'partners'/>);
    const sortSelect = await findByLabelText('Sort by');
  
    // Відкриваємо випадаючий список
    fireEvent.mouseDown(sortSelect);
  
    // Вибираємо значення
    const optionRatingUp = getByText('Rating UP');
    fireEvent.click(optionRatingUp);

    const optionRatingDown = getByText('Rating DOWN');
    fireEvent.click(optionRatingDown);

    const optionDefault = getByText('Default');
    fireEvent.click(optionDefault);

  });

});
describe('Sorter Component', () => {
  test('Sorter handles select change and dispatches actions', async () => {
    const { findByLabelText, getByText } = render(<Component type = 'products' />);
    const sortSelect = await findByLabelText('Sort by');
  
    // Відкриваємо випадаючий список
    fireEvent.mouseDown(sortSelect);
  
    // Вибираємо значення
    const optionRatingUp = getByText('Rating UP');
    fireEvent.click(optionRatingUp);

    const optionRatingDown = getByText('Rating DOWN');
    fireEvent.click(optionRatingDown);

    const optionPriceUp = getByText('Price UP');
    fireEvent.click(optionPriceUp);

    const optionPriceDown = getByText('Price DOWN');
    fireEvent.click(optionPriceDown);

    const optionDefault = getByText('Default');
    fireEvent.click(optionDefault);

  });

});
