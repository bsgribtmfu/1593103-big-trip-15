import { humanizeEventDate, getDuration } from '../utils/date.js';
import { genRandomItemFrom} from '../utils/common.js';
import Abstract from './abstract.js';

const generateEvent = (event) => {
  const {
    base_price: basePrice,
    date_from: dateFrom,
    date_to: dateTo,
    destination: {
      name,
    },
    is_favorite: isFavorite,
    offers,
    type,
  } = event;

  const diffDate = getDuration(dateFrom, dateTo);

  const offer = genRandomItemFrom(offers);

  const { title, price } = offer;

  const buttonFavorite = isFavorite !== true || 'event__favorite-btn--active';

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${humanizeEventDate(dateFrom, 'YYYY-MM-DD')}">${humanizeEventDate(dateFrom, 'DD MMM')}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event ${type} icon">
        </div>
        <h3 class="event__title">${type} ${name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${humanizeEventDate(dateFrom, 'YYYY-MM-DD')}">${humanizeEventDate(dateFrom, 'HH:mm')}</time>
            &mdash;
            <time class="event__end-time" datetime="${humanizeEventDate(dateTo, 'YYYY-MM-DD')}">${humanizeEventDate(dateTo, 'HH:mm')}</time>
          </p>
          <p class="event__duration">${humanizeEventDate(diffDate.format(), 'HH[H] mm[M]')}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          <li class="event__offer">
            <span class="event__offer-title">${title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
          </li>
        </ul>
        <button class="event__favorite-btn ${buttonFavorite}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class Event extends Abstract {
  constructor (event) {
    super();
    this._event = event;
    this._editClickHandler = this._editClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return generateEvent(this._event);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.event__favorite-btn').addEventListener('click', this._favoriteClickHandler);
  }
}
