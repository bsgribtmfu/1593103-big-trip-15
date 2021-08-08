import dayjs from 'dayjs';

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const genRandomItemFrom = (array) => {
  const randomIndex = getRandomIntInclusive(0, array.length - 1);
  return array[randomIndex];
};

const render = (element, position, template) => {
  element.insertAdjacentHTML(position, template);
};

const getLastWord = (offer) => {
  const words = offer.split(' ');
  return words[words.length - 1];
};

const differenceDate = (dateFrom, dateTo) => {
  const from = dayjs(dateFrom);
  const to = dayjs(dateTo);

  return dayjs.duration(to.diff(from));
};

const sortByDate = (points) => points.sort((a, b) => dayjs(a.date_from) - dayjs(b.date_from));

export { getRandomIntInclusive, genRandomItemFrom, sortByDate, render, getLastWord, differenceDate };
