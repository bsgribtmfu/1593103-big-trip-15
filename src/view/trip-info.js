import { sortByDate, humanizeTaskDate, createElement } from '../utils.js';

const findPoints = (points) => {
  const sortedPointsByDates = sortByDate(points);

  return {
    startPoint: sortedPointsByDates[0].destination.name,
    endPoint: sortedPointsByDates[sortedPointsByDates.length - 1].destination.name,
    throughPoint: sortedPointsByDates[sortedPointsByDates.length / 2 | 0].destination.name,
    startDate: sortedPointsByDates[0].date_from,
    endDate: sortedPointsByDates[sortedPointsByDates.length - 1].date_from,
  };
};

const generatetripInfo = (points) => {

  const { startPoint, endPoint, throughPoint, startDate, endDate }  = findPoints(points);

  const costValueDefinition = points
    .map((point) => point.base_price)
    .reduce((sum, price) => sum + price);

  return (
    `<section class="trip-main__trip-info trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${startPoint} &mdash; ${throughPoint} &mdash; ${endPoint}</h1>

      <p class="trip-info__dates">${humanizeTaskDate(startDate, 'MMM DD')}&nbsp;&mdash;&nbsp;${humanizeTaskDate(endDate, 'MMM DD')}.</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${costValueDefinition}</span>
    </p>
  </section>`
  );
};


export default class TripInfo {
  constructor (point) {
    this._point = point;
    this._element = null;
  }

  getTemplate() {
    return generatetripInfo(this._point);
  }

  getElement() {
    if(!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
