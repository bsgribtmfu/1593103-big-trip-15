import Abstract from './abstract.js';

const generateEmptyMessage = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class EmptyList extends Abstract {
  getTemplate() {
    return generateEmptyMessage();
  }
}
