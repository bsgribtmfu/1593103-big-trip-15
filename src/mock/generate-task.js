import dayjs from 'dayjs';

import { getRandomIntInclusive, genRandomItemFrom } from '../utils.js';

const generateOffers = (titles, price) => {

  const countOffers = getRandomIntInclusive(0, titles.length - 1);

  const offers = [];

  for (let i = 0; i <= countOffers; i++) {
    offers.push({
      'title': genRandomItemFrom(titles),
      'price': genRandomItemFrom(price),
    });
  }

  return offers;
};

const generatePictures = (descriptions) => {

  const pictures = [];

  descriptions.map(() => {
    const randomIndex = getRandomIntInclusive(0, descriptions.length - 1);

    pictures.push({
      'src': `http://picsum.photos/248/152?r=${randomIndex}`,
      'description': descriptions[randomIndex],
    });
  });

  return pictures;
};

const generateTitle = (description) => {
  const descriptions = description.split('. ');

  const randomIndex = getRandomIntInclusive(1, 5);

  const randomTitles = [];

  for (let i = 0; i <= randomIndex; i++) {
    const random = getRandomIntInclusive(0, descriptions.length - 1);
    randomTitles.push(descriptions[random]);
  }

  return randomTitles.join(' ');
};

const generateRandomDate = () => {
  const now = dayjs()
    .add(getRandomIntInclusive(1, 30), 'day')
    .add(getRandomIntInclusive(0, 23), 'hour');

  return now.format('YYYY-MM-DDTHH:mm:ss.sss[Z]');
};

const generateFromToDate = () => {
  const currentDate = generateRandomDate();
  const newDate = dayjs(currentDate)
    .add(getRandomIntInclusive(0, 10), 'minutes')
    .format('YYYY-MM-DDTHH:mm:ss.sss[Z]');

  return ({
    dateFrom: currentDate,
    dateTo: newDate,
  });
};

export {
  generateOffers,
  generatePictures,
  generateTitle,
  generateFromToDate
};
