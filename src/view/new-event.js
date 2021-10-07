import { humanizeEventDate } from '../utils/date.js';
import { getLastWord, getOffersByType, getDestinationByName} from '../utils/common.js';
import Smart from './smart.js';

import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const typeItemTemplate = (type, currentType, id) => (
  `<div class="event__type-item">
    <input id="event-type-${type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${type === currentType ? 'checked' : ''}>
    <label class="event__type-label event__type-label--${type}" for="event-type-${type}-${id}">${type}</label>
  </div>`
);

const generateTypeItems = (offers, currentType) => offers.map((offer, id) => typeItemTemplate(offer.type, currentType, id)).join('');

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

const generateOffers = (avalibleOffers) => {

  const offersElements = avalibleOffers.map((offer, id) => (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox visually-hidden" data-title="${offer.title}" data-price="${offer.price}" id="event-offer-${getLastWord(offer.title)}-${id}" type="checkbox" name="event-offer-${getLastWord(offer.title)}">
      <label class="event__offer-label" for="event-offer-${getLastWord(offer.title)}-${id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`
  ));

  return offersElements.join('');
};

const generateOffersSection = (avalibleOffersByType) => {

  const offersElements = generateOffers(avalibleOffersByType);


  if(!avalibleOffersByType.length) {
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

const generateDistanations = (destinations) => destinations.map((destination) => `<option value="${destination.name}"></option>`).join('');

const generateForm = (data, avalibleOffers, destinations) => {
  const {
    'base_price': basePrice,
    'date_from': dateFrom,
    'date_to': dateTo,
    destination,
    type,
    isDisabled,
    isSaving,
    isDeleting,
  } = data;

  // const isDisabled = !destination.name || !basePrice ? 'disabled' : '';

  const destinationOptions = generateDistanations(destinations);
  const avalibleOffersByType = avalibleOffers.length ? getOffersByType(type, avalibleOffers) : [];

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${generateTypeItems(avalibleOffers, type)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
            <datalist id="destination-list-1">
              ${destinationOptions}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeEventDate(dateFrom, 'DD/MM/YY')} ${humanizeEventDate(dateFrom, 'HH:mm')}" ${isDisabled ? 'disabled' : ''}>
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeEventDate(dateTo, 'DD/MM/YY')} ${humanizeEventDate(dateTo, 'HH:mm')}" ${isDisabled ? 'disabled' : ''}>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">${basePrice}</span>
              &euro;
            </label>
            <input class="event__input event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}" ${isDisabled ? 'disabled' : ''}>
          </div>

          <button class="event__save-btn btn btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
          <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
        </header>
        <section class="event__details">
          ${generateOffersSection(avalibleOffersByType)}
          ${generateDistanationSection(destination)}
        </section>
      </form>
    </li>`
  );
};

export default class NewEvent extends Smart {
  constructor (event, offers, destination) {
    super();
    this._data = NewEvent.parseEventToData(event);
    this._offers = offers;
    this._destination = destination;

    this._datepickerStart = null;
    this._datepickerEnd = null;

    this._eventTypeSelectHandler = this._eventTypeSelectHandler.bind(this);
    this._eventDestinationInputHandler = this._eventDestinationInputHandler.bind(this);
    this._eventDestinationChangeHandler = this._eventDestinationChangeHandler.bind(this);
    this._eventPriceInputHandler = this._eventPriceInputHandler.bind(this);
    this._eventPriceChangeHandler = this._eventPriceChangeHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteHandler = this._formDeleteHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);

    this._setDatepicker();
    this._setInnerHandlers();
  }

  getTemplate() {
    return generateForm(this._data, this._offers, this._destination);
  }

  reset(event) {
    this.updateData(NewEvent.parseEventToData(event));
  }

  restoreHandlers() { // restore handlers
    this._setDatepicker();
    this._setInnerHandlers();
    this.setEditDeliteClickHandler(this._callback._deleteSubmit);
    this.setEditSubmitHandler(this._callback.formSubmit);
  }

  _eventTypeSelectHandler(evt) {
    evt.preventDefault();
    const value = evt.target.parentElement.querySelector('input').value;

    this.updateData({
      type: value,
      offers: getOffersByType(value, this._offers),
    });
  }

  _eventDestinationInputHandler(evt) {
    evt.target.value = evt.target.value.replace(/[^a-zA-Z\s]/, '');
  }

  _eventDestinationChangeHandler(evt) {
    const selectedDestination = getDestinationByName(evt.target.value, this._destination);

    if(!selectedDestination) {
      evt.target.setCustomValidity('Данный город недоступен для выбора, используйте другой');
    }
    else {
      evt.target.setCustomValidity('');

      this.updateData({
        destination: {
          description: selectedDestination.description,
          name: evt.target.value,
          pictures: selectedDestination.pictures,
        },
      });
    }

    evt.target.reportValidity();
  }

  _eventPriceInputHandler(evt) {
    evt.target.value = evt.target.value.replace(/[^0-9]/, '');

    const price = Number(evt.target.value);

    if (!price || price === 0) {
      evt.target.setCustomValidity('Цена не может быть пустым полем или равна нулю.');
    }
    else {
      evt.target.setCustomValidity('');

      this.updateData({
        'base_price': price,
      }, true);
    }

    evt.target.reportValidity();
  }

  _eventPriceChangeHandler(evt) { // change input price
    this.updateData({
      'base_price': Number(evt.target.value),
    });
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();

    const selectedOffers = Array.from(this.getElement()
      .querySelectorAll('.event__offer-checkbox'))
      .filter((offer) => offer.checked === true)
      .map((offer) => ({ //  or DOMStringMap to Object -> Object.assign({}, element.dataset);
        title: offer.dataset.title,
        price: Number(offer.dataset.price),
      }));

    this.updateData({
      offers: selectedOffers,
    });

    this._callback.formSubmit(NewEvent.parseDataToEvent(this._data));
  }

  _formDeleteHandler(evt) { // delete
    evt.preventDefault();
    this._callback._deleteSubmit(NewEvent.parseDataToEvent(this._data));
    this._element = null;
  }

  _setInnerHandlers() { // обработчики событий View
    this.getElement().querySelector('.event__type-list').addEventListener('click', this._eventTypeSelectHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('input', this._eventDestinationInputHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._eventDestinationChangeHandler);
    this.getElement().querySelector('.event__input--price').addEventListener('input', this._eventPriceInputHandler);
    this.getElement().querySelector('.event__input--price').addEventListener('change', this._eventPriceChangeHandler);
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
      {
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      },
    );
  }

  static parseDataToEvent(data) {
    data = Object.assign({}, data);

    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return data;
  }
}
