import Abstract from './abstract.js';
import { NoEventsTextType } from '../constans.js';

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
