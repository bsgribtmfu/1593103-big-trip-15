import Abstract from './abstract.js';

const generateItem = () => '<li class="trip-events__item"></li>';

export default class EventItem extends Abstract {
  getTemplate() {
    return generateItem();
  }
}
