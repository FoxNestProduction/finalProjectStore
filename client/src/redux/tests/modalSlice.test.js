import modalReducer, { openModal,
  closeModal,
  setTitle,
  setContent,
  setButtonAgree,
  addButtonBox } from '../slices/modalSlice';

const initialState = {
  isOpen: false,
  title: '',
  content: '',
  buttonBox: false,
  buttonAgree: {
    text: '',
    startIcon: false,
    endIcon: false,
    onClick: null,
    disabled: false,
  },
};

describe('modalSlice', () => {
  test('should return initial state when passed an empty action', () => {
    expect(modalReducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('should set isOpen to true with "openModal" action', () => {
    const result = modalReducer(initialState, openModal());
    expect(result.isOpen).toBe(true);
  });

  test('should reset states to the initial ones with "closeModal" action', () => {
    const openModalStates = {
      isOpen: true,
      title: 'Hello',
      content: 'Do you want to add new review?',
      buttonBox: true,
      buttonAgree: {
        text: 'Add',
        startIcon: true,
        endIcon: false,
        onClick: () => {},
        disabled: false,
      },
    };
    const result = modalReducer(openModalStates, closeModal());
    expect(result).toEqual(initialState);
  });

  test('should save title into state with "setTitle" action', () => {
    const title = 'Title';
    const result = modalReducer(initialState, setTitle(title));
    expect(result.title).toBe(title);
  });

  test('should save content into state with "setContent" action', () => {
    const content = 'Do you want to add new review?';
    const result = modalReducer(initialState, setContent(content));
    expect(result.content).toBe(content);
  });

  test('should set buttonBox to true with "addButtonBox" action', () => {
    const result = modalReducer(initialState, addButtonBox(true));
    expect(result.buttonBox).toBe(true);
  });

  test('should set buttonAgree with "setButtonAgree" action', () => {
    const buttonAgree = {
      text: 'Click me',
      startIcon: true,
      endIcon: false,
      onClick: () => {},
      disabled: false,
    };
    const result = modalReducer(initialState, setButtonAgree(buttonAgree));
    expect(result.buttonAgree).toEqual(buttonAgree);
  });
});
