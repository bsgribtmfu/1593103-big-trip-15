import Abstract from './abstract.js';
import { NavigationItem } from '../mock/constans.js';

const generateNavigation = () => (
  `<nav class="trip-controls__trip-tabs trip-tabs">
    <a class="trip-tabs__btn trip-tabs__btn--active" href="#" data-navigation="${NavigationItem.EVENTS}">Table</a>
    <a class="trip-tabs__btn" href="#" data-navigation="${NavigationItem.STATISTICS}">Stats</a>
  </nav>`
);

export default class Navigation extends Abstract {
  constructor() {
    super();
    this._navigationClickHandler = this._navigationClickHandler.bind(this);
  }

  getTemplate() {
    return generateNavigation();
  }

  _navigationClickHandler(evt) {
    evt.preventDefault();
    if (evt.target.tagName !== 'A') {
      return;
    }

    this._callback.navigationClick(evt.target.dataset.navigation);
  }

  setNavigationClickHandler(callback) {
    this._callback.navigationClick = callback;
    this.getElement().addEventListener('click', this._navigationClickHandler);
  }

  setNavigationItem(navigationItem) {
    const items = this.getElement().querySelectorAll('.trip-tabs__btn');
    const item = this.getElement().querySelector(`[data-navigation=${navigationItem}]`);

    items.forEach((i) => i.classList.remove('trip-tabs__btn--active'));

    if (item !== null) {
      item.classList.add('trip-tabs__btn--active');
    }
  }
}
