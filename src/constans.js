const STATS_BAR_HEIGHT = 55;

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

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const NavigationItem = {
  EVENTS: 'EVENTS',
  STATISTICS: 'STATISTICS',
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};

const NoEventsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
};

export {
  STATS_BAR_HEIGHT,
  SortType,
  UserAction,
  UpdateType,
  FilterType,
  NavigationItem,
  Method,
  SuccessHTTPStatusRange,
  Mode,
  State,
  NoEventsTextType
};
