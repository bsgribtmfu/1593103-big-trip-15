import Abstract from './abstract.js';

const createNoEventsTemplate = () => '<p class="trip-events__msg">Loading...</p>';

export default class EmptyList extends Abstract {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createNoEventsTemplate();
  }
}
