import { CITIES, TYPES, BASE_PRICES, TITLES, PRICES, IMAGES_DESCRIPTION, DESCRIPTION } from './constans.js';
import { generateTitle, generateOffers, generatePictures, generateFromToDate } from './generate-task.js';
import { getRandomIntInclusive, genRandomItemFrom } from '../utils.js';

const generateDistanation = () => (
  {
    'description': generateTitle(DESCRIPTION),
    'name': genRandomItemFrom(CITIES),
    'pictures': generatePictures(IMAGES_DESCRIPTION),
  }
);

const generateEvent = () => {
  const newDate = generateFromToDate();

  return {
    'base_price': genRandomItemFrom(BASE_PRICES),
    'date_from': newDate.dateFrom,
    'date_to': newDate.dateTo,
    'destination': generateDistanation(),
    'id': getRandomIntInclusive(0, 20),
    'is_favorite': Boolean(getRandomIntInclusive(0, 1)),
    'offers': generateOffers(TITLES, PRICES),
    'type': genRandomItemFrom(TYPES),
  };
};

export { generateEvent };
