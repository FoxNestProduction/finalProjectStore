const scrollToElementTop = (element) => {
  const position = element.getBoundingClientRect().top + window.scrollY - 115;
  window.scrollTo({ top: position, behavior: 'smooth' });
};

export default scrollToElementTop;
