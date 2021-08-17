import Abstract from './abstract.js';

const generateList = () => '<ul class="trip-events__list"></ul>';

export default class EventsList extends Abstract {
  getTemplate() {
    return generateList();
  }
}
