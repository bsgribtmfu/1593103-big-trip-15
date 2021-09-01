import { humanizeEventDate } from '../utils/date.js';
import { getLastWord } from '../utils/common.js';
import { CITIES as destinations } from '../mock/constans.js';
import { offersMock, findOfferByType } from '../mock/data-structure.js';

import Abstract from './abstract.js';

const generateDestinationPhotos = (pictures) => {

  const pucturesElements = pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt=${picture.description}">`);

  return (
    `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${pucturesElements.join('')}
      </div>
    </div>`
  );
};

const generateOffers = (offers) => {
  const offersElements = offers.map((offerItem) => {
    const word = getLastWord(offerItem.title);

    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${word}-1" type="checkbox" name="event-offer-${word}">
        <label class="event__offer-label" for="event-offer-${word}-1">
          <span class="event__offer-title">${offerItem.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offerItem.price}</span>
        </label>
      </div>`
    );
  });

  return offersElements.join('');
};

const generateOffersTemplate = (offers) => {

  const offersElements = generateOffers(offers);

  if(!offers.length) {
    return '';
  }

  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offersElements}
      </div>
    </section>`
  );
};

const generateDistanations = () => destinations.map((destination) => `<option value="${destination}"></option>`).join('');

const generateForm = (data) => {
  const {
    base_price: basePrice,
    date_from: dateFrom,
    date_to: dateTo,
    destination: {
      name,
      description,
      pictures,
    },
    offers,
    type,
  } = data;

  const destinationPhotos = generateDestinationPhotos(pictures);
  const destinationOptions = generateDistanations();

  return (
    `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

              <div class="event__type-item">
                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${destinationOptions}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeEventDate(dateFrom, 'DD/MM/YY')} ${humanizeEventDate(dateFrom, 'HH:MM')}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeEventDate(dateTo, 'DD/MM/YY')} ${humanizeEventDate(dateTo, 'HH:MM')}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">${basePrice}</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${generateOffersTemplate(offers)}
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}</p>

          ${destinationPhotos}
        </section>
      </section>
    </form>
    </li>`
  );
};

export default class editForm extends Abstract { // название классов с заглавной буквы?
  constructor (event) {
    super();
    this._data = editForm.parseEventToData(event); // состояние
    this._eventTypeSelectHandler = this._eventTypeSelectHandler.bind(this);
    this._eventDestinationInputHandler = this._eventDestinationInputHandler.bind(this);
    this._eventPriceChangeHandler = this._eventPriceChangeHandler.bind(this);
    this._eventPriceInputHandler = this._eventPriceInputHandler.bind(this);
    this._editClickHandler = this._editClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formRemoveHandler = this._formRemoveHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return generateForm(this._data);
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._data = Object.assign(
      {},
      this._data,
      update,
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  restoreHandlers() { // restore handlers
    this._setInnerHandlers();
    this.setEditDeliteClickHandler(this._callback.deliteSubmit);
    this.setEditSubmitHandler(this._callback.formSubmit);
    this.setEditClickHandler(this._callback.editClick);
  }

  _eventTypeSelectHandler(evt) { // тип точки маршрута, нужно показать соответствующий типу набор дополнительных опций.
    evt.preventDefault();
    const value = evt.target.parentElement.querySelector('input').value;

    this.updateData({
      type: value,
      offers: findOfferByType(value, offersMock),
    });
  }

  _eventDestinationInputHandler(evt) { // пункт назначения
    if(!evt.target.value.length) {
      evt.target.placeholder = 'Enter or select city name';
    }
  }

  _eventDestinationChangeHandler() {
    // this.updateData({
    //   'description': generateTitle(DESCRIPTION),
    //   'name': genRandomItemFrom(CITIES),
    //   'pictures': generatePictures(IMAGES_DESCRIPTION),
    // }, true);
  }

  _eventPriceChangeHandler(evt) { // change input price
    const price = Number(evt.target.value);

    if (price <= 0) {
      evt.target.value = '1'; // что тут вернуть, текущее значение?
    }

    this.updateData({
      'base_price': evt.target.value,
    }, true);
  }

  _eventPriceInputHandler(evt) {
    console.log(typeof evt.target.value); // eslint-disable-line
    return evt.target.value.replace(/[^0-9]/, ''); // почему эта казлина не реплейсит, я уже все регулярки перепробывал
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(editForm.parseDataToEvent(this._data));
  }

  _formRemoveHandler(evt) {
    evt.preventDefault();
    this._callback.deliteSubmit();
    this._element = null;
  }

  _setInnerHandlers() { // обработчики событий View
    this.getElement().querySelector('.event__type-list').addEventListener('click', this._eventTypeSelectHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('input', this._eventDestinationInputHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('input', this._eventDestinationChangeHandler);
    this.getElement().querySelector('.event__input--price').addEventListener('change', this._eventPriceChangeHandler);
    this.getElement().querySelector('.event__input--price').addEventListener('input', this._eventPriceInputHandler);
  }

  setEditClickHandler(callback) { // button 'rollup'
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }

  setEditSubmitHandler(callback) { // button 'Save'
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  setEditDeliteClickHandler(callback) { // button 'Delete'
    this._callback.deliteSubmit = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formRemoveHandler);
  }

  static parseEventToData(event) {
    return Object.assign(
      {},
      event,
    );
  }

  static parseDataToEvent(data) {
    data = Object.assign({}, data);

    return data;
  }
}
