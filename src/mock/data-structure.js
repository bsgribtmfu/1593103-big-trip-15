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

// const generateDistanations = () => CITIES.map((city) => Object.assign({}, generateDistanation(), {name: city}));

// const cityValue = 'Amsterdam';
// const destinations1 = generateDistanations();

// const getDestinationByName = (cityValue, destinations) => {
//   return destinations.find((city) => cityValue === city.name);
// }

// console.log(getDestinationByName(cityValue, destinations1));

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
      'type': type,
      'offers': generateOffers(TITLES, PRICES),
    });
  });

  return offers;
};

const offersMock = getOffersStructure();

const findOfferByType = (typeValue, offers) => {
  const foundOffer = offers.find((offer) => typeValue === offer.type);
  return foundOffer.offers;
};

export { generateEvent, offersMock, findOfferByType };
