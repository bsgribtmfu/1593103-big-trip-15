import { sortByDate, humanizeEventDate } from '../utils/date.js';
import Abstract from './abstract.js';

const findEvents = (events) => {
  const startDestination = events[0].destination.name;
  const middleDestination = events[events.length / 2 | 0].destination.name;
  const endDestination = events[events.length - 1].destination.name;

  switch(true) {
    case(events.length === 1):
      return startDestination;
    case(events.length === 2):
      return `${startDestination} &mdash; ${endDestination}`;
    case(events.length === 3):
      return `${startDestination} &mdash; ${middleDestination} &mdash; ${endDestination}`;
    case(events.length > 3):
      return `${startDestination} &mdash; ... &mdash; ${endDestination}`;
  }
};

const generatetripInfo = (events) => {
  const sortedEventsByDates = events.sort(sortByDate);

  const rangeDates = sortedEventsByDates.length > 1 ? `${humanizeEventDate(sortedEventsByDates[0].date_from, 'MMM DD')} &nbsp;&mdash;&nbsp; ${humanizeEventDate(sortedEventsByDates[sortedEventsByDates.length - 1].date_from, 'MMM DD')}` : `${humanizeEventDate(sortedEventsByDates[0].date_from, 'MMM DD')}`;
  const totalTripCost = sortedEventsByDates.reduce((a, b) => a + b.base_price, 0);

  return (
    `<section class="trip-main__trip-info trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${findEvents(sortedEventsByDates)}</h1>
        <p class="trip-info__dates">${rangeDates}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalTripCost}</span>
      </p>
    </section>`
  );
};

export default class TripInfo extends Abstract {
  constructor (events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return generatetripInfo(this._events);
  }
}
