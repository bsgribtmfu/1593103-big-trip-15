import { CITIES, TYPES, BASEPRICE, TITLES, PRICE, IMAGEDESCRIPTION } from './constans.js';
import { generateTitle, generateOffers, generatePictures, generateFromToDate } from './generate-task.js';
import { getRandomIntInclusive, genRandomItemFrom } from '../utils.js';

const generateOffer = () => (
  {
    'type': genRandomItemFrom(TYPES),
    'offers': generateOffers(TITLES, PRICE),
  }
);

const generateDistanation = () => (
  {
    'description': generateTitle(),
    'name': genRandomItemFrom(CITIES),
    'pictures': generatePictures(IMAGEDESCRIPTION),
  }
);

const generatePoint = () => {
  const newDate = generateFromToDate();

  return {
    'base_price': genRandomItemFrom(BASEPRICE),
    'date_from': newDate.dateFrom,
    'date_to': newDate.dateTo,
    'destination': generateDistanation(),
    'id': getRandomIntInclusive(0, 20),
    'is_favorite': Boolean(getRandomIntInclusive(0, 1)),
    'offers': generateOffers(TITLES, PRICE),
    'type': genRandomItemFrom(TYPES),
  };
};

export { generatePoint };
