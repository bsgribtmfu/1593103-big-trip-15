import { createElement } from '../utils.js';

const generateItem = () => '<li class="trip-events__item"></li>';

export default class EventItem {
  constructor () {
    this._element = null;
  }

  getTemplate() {
    return generateItem();
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
