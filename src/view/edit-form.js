import { humanizeEventDate } from '../utils/date.js';
import { getLastWord } from '../utils/common.js';
import { offersMock, findOfferByType, getDestinationByName, destinations} from '../mock/data-structure.js';
import Smart from './smart.js';

import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

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

const generateDistanationSection = (distanation) => {
  if(!distanation.description || !distanation.pictures) {
    return '';
  }

  return (
    `<section class="event__section event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${distanation.description}</p>
      ${generateDestinationPhotos(distanation.pictures)}
    </section>`
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

const generateOffersSection = (offers) => {

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

const generateDistanations = () => destinations.map((destination) => `<option value="${destination.name}"></option>`).join('');

const generateForm = (data) => {
  const {
    base_price: basePrice,
    date_from: dateFrom,
    date_to: dateTo,
    destination,
    offers,
    type,
  } = data;

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
          <input class="event__input event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${destinationOptions}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeEventDate(dateFrom, 'DD/MM/YY')} ${humanizeEventDate(dateFrom, 'HH:mm')}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeEventDate(dateTo, 'DD/MM/YY')} ${humanizeEventDate(dateTo, 'HH:mm')}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">${basePrice}</span>
            &euro;
          </label>
          <input class="event__input event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn btn btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${generateOffersSection(offers)}
        ${generateDistanationSection(destination)}
      </section>
    </form>
    </li>`
  );
};

export default class EditForm extends Smart {
  constructor (event) {
    super();
    this._data = EditForm.parseEventToData(event);
    this._datepickerStart = null;
    this._datepickerEnd = null;

    this._eventTypeSelectHandler = this._eventTypeSelectHandler.bind(this);
    this._eventDestinationInputHandler = this._eventDestinationInputHandler.bind(this);
    this._eventDestinationChangeHandler = this._eventDestinationChangeHandler.bind(this);
    this._eventPriceChangeHandler = this._eventPriceChangeHandler.bind(this);
    this._eventPriceInputHandler = this._eventPriceInputHandler.bind(this);
    this._editClickHandler = this._editClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteHandler = this._formDeleteHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);

    this._setDatepicker();
    this._setInnerHandlers();
  }

  getTemplate() {
    return generateForm(this._data);
  }

  reset(event) {
    this.updateData(EditForm.parseEventToData(event));
  }

  restoreHandlers() { // restore handlers
    this._setDatepicker();
    this._setInnerHandlers();
    this.setEditDeliteClickHandler(this._callback._deleteSubmit);
    this.setEditSubmitHandler(this._callback.formSubmit);
    this.setEditClickHandler(this._callback.editClick);
  }

  _eventTypeSelectHandler(evt) {
    evt.preventDefault();
    const value = evt.target.parentElement.querySelector('input').value;

    this.updateData({
      type: value,
      offers: findOfferByType(value, offersMock),
    });
  }

  _eventDestinationInputHandler(evt) {
    if(!evt.target.value.length) {
      evt.target.setCustomValidity('Поле не может быть пустым, введите названия города или выберите из списка.');
      this.getElement().querySelector('.event__save-btn').disabled = true;
    }
    else {
      this.getElement().querySelector('.event__save-btn').disabled = false;
      evt.target.setCustomValidity('');
    }

    evt.target.reportValidity();
  }

  _eventDestinationChangeHandler(evt) {
    const selectedDestination = getDestinationByName(evt.target.value, destinations);

    if(!selectedDestination) {
      this.getElement().querySelector('.event__save-btn').disabled = true;
      evt.target.setCustomValidity('Данный город недоступен для выбора, используйте другой');
      evt.target.reportValidity();
    }
    else {
      this.getElement().querySelector('.event__save-btn').disabled = false;
      this.updateData({
        destination: {
          description: selectedDestination.description,
          name: evt.target.value,
          pictures: selectedDestination.pictures,
        },
      });
    }

  }

  _eventPriceChangeHandler(evt) { // change input price
    this.updateData({
      'base_price': evt.target.value,
    }, true);
  }

  _eventPriceInputHandler(evt) {
    evt.target.value = evt.target.value.replace(/[^0-9]/, '');

    const price = Number(evt.target.value);

    if (!price || price === 0) {
      this.getElement().querySelector('.event__save-btn').disabled = true;
      evt.target.setCustomValidity('Цена не может быть пустым полем или равна нулю.');
    }
    else {
      this.getElement().querySelector('.event__save-btn').disabled = false;
      evt.target.setCustomValidity('');
    }

    evt.target.reportValidity();
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EditForm.parseDataToEvent(this._data));
  }

  _formDeleteHandler(evt) {
    evt.preventDefault();
    this._callback._deleteSubmit(EditForm.parseDataToEvent(this._data));
    this._element = null;
  }

  _setInnerHandlers() { // обработчики событий View
    this.getElement().querySelector('.event__type-list').addEventListener('click', this._eventTypeSelectHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('input', this._eventDestinationInputHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._eventDestinationChangeHandler);
    this.getElement().querySelector('.event__input--price').addEventListener('change', this._eventPriceChangeHandler);
    this.getElement().querySelector('.event__input--price').addEventListener('input', this._eventPriceInputHandler);
  }

  removeElement() {
    super.removeElement();
    this._clearDatepicker();
  }

  _clearDatepicker() {
    if (this._datepickerStart) {
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }

    if (this._datepickerEnd) {
      this._datepickerEnd.destroy();
      this._datepickerEnd = null;
    }
  }

  _setDatepicker() {
    this._clearDatepicker();
    this._datepickerStart = flatpickr(
      this.getElement().querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        maxDate: this._data.date_to,
        defaultDate: this._data.date_from,
        onChange: this._startDateChangeHandler,
      },
    );

    this._datepickerEnd = flatpickr(
      this.getElement().querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        minDate: this._data.date_from,
        defaultDate: this._data.date_to,
        onChange: this._endDateChangeHandler,
      },
    );
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
    this._callback._deleteSubmit = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteHandler);
  }

  _startDateChangeHandler([dateFrom]) {
    this.updateData({
      'date_from': dateFrom,
    });
  }

  _endDateChangeHandler([dateTo]) {
    this.updateData({
      'date_to': dateTo,
    });
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
