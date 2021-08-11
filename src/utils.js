import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
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

const differenceDate = (dateFrom, dateTo) => {
  const from = dayjs(dateFrom);
  const to = dayjs(dateTo);

  return dayjs.duration(to.diff(from)).format();
};

const sortByDate = (points) => points.sort((a, b) => dayjs(a.date_from) - dayjs(b.date_from));

const humanizeTaskDate = (date, format) => dayjs(date).format(format);

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND:  'beforeend',
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;

    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export {
  getRandomIntInclusive,
  genRandomItemFrom,
  sortByDate,
  getLastWord,
  differenceDate,
  humanizeTaskDate,
  RenderPosition,
  render,
  createElement
};
