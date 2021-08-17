import { sortByDate, humanizeEventDate } from '../utils/date.js';
import Abstract from './abstract.js';

const findEvents = (events) => {
  const sortedPointsByDates = sortByDate(events);

  return {
    startPoint: sortedPointsByDates[0].destination.name,
    endPoint: sortedPointsByDates[sortedPointsByDates.length - 1].destination.name,
    throughPoint: sortedPointsByDates[sortedPointsByDates.length / 2 | 0].destination.name,
    startDate: sortedPointsByDates[0].date_from,
    endDate: sortedPointsByDates[sortedPointsByDates.length - 1].date_from,
  };
};

const generatetripInfo = (events) => {

  const { startPoint, endPoint, throughPoint, startDate, endDate }  = findEvents(events);

  const costValueDefinition = events
    .map((event) => event.base_price)
    .reduce((sum, price) => sum + price);

  return (
    `<section class="trip-main__trip-info trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${startPoint} &mdash; ${throughPoint} &mdash; ${endPoint}</h1>

      <p class="trip-info__dates">${humanizeEventDate(startDate, 'MMM DD')}&nbsp;&mdash;&nbsp;${humanizeEventDate(endDate, 'MMM DD')}.</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${costValueDefinition}</span>
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
