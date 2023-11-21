import scrollAnchorReducer, { setProductsScrollAnchor, setIsApplyClicked } from '../slices/scrollAnchorSlice';

const initialState = {
  productsScrollAnchor: null,
  isApplyClicked: false,
};

describe('scrollAnchorSlice', () => {
  test('should return initial state when passed an empty action', () => {
    expect(scrollAnchorReducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('should add productsScrollAnchor with "setProductsScrollAnchor" action', () => {
    const anchor = '<div>Anchor</div>';
    const state = scrollAnchorReducer(undefined, setProductsScrollAnchor(anchor));
    expect(state.productsScrollAnchor).toEqual('<div>Anchor</div>');
  });

  test('should change isApplyClicked state with "setIsApplyClicked" action', () => {
    const state = scrollAnchorReducer(undefined, setIsApplyClicked(true));
    expect(state.isApplyClicked).toEqual(true);
  });
});
