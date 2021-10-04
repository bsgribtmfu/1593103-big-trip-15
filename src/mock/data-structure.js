import { nanoid } from 'nanoid';

import { CITIES, TYPES, BASE_PRICES, TITLES, PRICES, IMAGES_DESCRIPTION, DESCRIPTION } from './constans.js';
import { generateTitle, generateOffers, generatePictures, generateFromToDate } from './generate-task.js';
import { getRandomIntInclusive, genRandomItemFrom } from '../utils/common.js';

const generateDistanation = () => (
  {
    description: generateTitle(DESCRIPTION),
    name: genRandomItemFrom(CITIES),
    pictures: generatePictures(IMAGES_DESCRIPTION),
  }
);

const generateDistanations = () => CITIES.map((city) => Object.assign({}, generateDistanation(), {name: city}));

const destinations = generateDistanations();

const generateEvent = () => {
  const newDate = generateFromToDate();

  return {
    'base_price': genRandomItemFrom(BASE_PRICES),
    'date_from': newDate.dateFrom,
    'date_to': newDate.dateTo,
    'destination': generateDistanation(),
    'id': nanoid(),
    'is_favorite': Boolean(getRandomIntInclusive(0, 1)),
    'offers': generateOffers(TITLES, PRICES),
    'type': genRandomItemFrom(TYPES),
  };
};

const getOffersStructure = () => {
  const offers = [];

  TYPES.forEach((type) => {
    offers.push({
      type: type,
      offers: generateOffers(TITLES, PRICES),
    });
  });

  return offers;
};

const offersMock = getOffersStructure();

export { generateEvent, offersMock, destinations };
