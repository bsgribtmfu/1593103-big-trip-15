import { getRandomIntInclusive, genRandomItemFrom } from '../utils.js';
const dayjs = require('dayjs');

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

const generateTitle = () => {
  const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
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
