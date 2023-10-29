const getChangedString = (string) => {
  const words = string.split(' ');

  const changedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  return changedWords.join(' ');
};

export default getChangedString;
