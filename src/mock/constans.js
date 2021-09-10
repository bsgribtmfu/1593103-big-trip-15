const CITIES = [
  'Oslo',
  'Helsenki',
  'Moscow',
  'Milan',
  'Paris',
  'Amsterdam',
];

const TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'transport',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const TITLES = [
  'Book a taxi at the arrival point',
  'Order a breakfast',
  'Wake up at a certain time',
  'Choose meal',
  'Upgrade to comfort class',
  'Upgrade to a business class',
  'Choose the radio station',
];

const IMAGES_DESCRIPTION = [
  'Moscow city centre',
  'Chamonix parliament building',
  'Rotterdam city centre',
  'Tokio park',
  'Kopenhagen zoo',
];

const DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

const PRICES = [180, 90, 50, 30, 170, 50, 130];

const BASE_PRICES = [282, 1100, 630, 380, 450];

const SortType = {
  DEFAULT: 'DEFAULT',
  TRIP_TIME: 'TRIP_TIME',
  PRICE_UP: 'PRICE_UP',
};

const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

const UpdateType = { // семантическое версионирование
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export { CITIES, TYPES, TITLES, IMAGES_DESCRIPTION, PRICES, BASE_PRICES, DESCRIPTION, SortType, UserAction, UpdateType };
