import { generateEvent } from './mock/data-structure.js';

import Trip from './presenter/trip.js';

const tripMainElement = document.querySelector('.trip-main');
const navigationContainer = document.querySelector('.trip-controls__navigation');
const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const EVENT_COUNT = 20;

const generateEvents = (count) => {
  const eventElements = [];

  for (let i = 0; i < count; i++) {
    eventElements.push(generateEvent());
  }

  return eventElements;
};

const events = generateEvents(EVENT_COUNT);

new Trip(tripEventsElement, tripMainElement, navigationContainer, filtersContainer).init(events);
