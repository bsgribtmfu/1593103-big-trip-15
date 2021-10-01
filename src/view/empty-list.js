import Abstract from './abstract.js';
import { FilterType } from '../mock/constans.js';

const NoEventsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
};

const generateNoEvents = (filterType) => `<p class="trip-events__msg">${NoEventsTextType[filterType]}</p>`;

export default class EmptyList extends Abstract {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return generateNoEvents(this._data);
  }
}
