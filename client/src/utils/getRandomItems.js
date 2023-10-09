const getRandomItems = (arr, counter) => {
  const randomItems = [];
  while (randomItems.length < counter && arr.length > 0) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    randomItems.push(arr[randomIndex]);
    arr.splice(randomIndex, 1);
  }
  return randomItems;
};

export default getRandomItems;
