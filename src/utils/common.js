const getRandomIntInclusive = (minValue, maxValue) => {
  const min = Math.ceil(minValue);
  const max = Math.floor(maxValue);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const genRandomItemFrom = (array) => {
  const randomIndex = getRandomIntInclusive(0, array.length - 1);
  return array[randomIndex];
};

const getLastWord = (offer) => {
  const words = offer.split(' ');
  return words[words.length - 1];
};

export { getRandomIntInclusive, genRandomItemFrom, getLastWord };
