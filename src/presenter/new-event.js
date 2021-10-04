import { nanoid } from 'nanoid';
import { removeElement, render, RenderPosition } from '../utils/render.js';
import { UserAction, UpdateType } from '../mock/constans.js';

import dayjs from 'dayjs';

import NewEventView from '../view/new-event.js';

export default class NewEvent {
  constructor(eventsListContainer, changeData) {

    this._eventsListContainer = eventsListContainer;
    this._changeData = changeData;

    this._editFormComponent = null;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleEditSubmit = this._handleEditSubmit.bind(this);   // save | submit
    this._deleteEditForm = this._deleteEditForm.bind(this);       // form -> event  | remove
  }


  init(offers, destination) {
    this._offers = offers;
    this._destination = destination;

    if (this._editFormComponent !== null) {
      return;
    }

    const event = {
      'base_price': 0,
      'date_from': dayjs().toDate(),
      'date_to': dayjs().add(10, 'minute').toDate(),
      destination: {
        description: '',
        name: '',
        pictures: [],
      },
      id: nanoid(),
      'is_favorite': false,
      offers: [],
      type: 'taxi',
    };

    this._editFormComponent = new NewEventView(event, this._offers, this._destination);

    this._editFormComponent.setEditSubmitHandler(this._handleEditSubmit);     // save | submit
    this._editFormComponent.setEditDeliteClickHandler(this._deleteEditForm);  // form -> event  | remove

    render(this._eventsListContainer, this._editFormComponent, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  destroy() {
    if (this._editFormComponent === null) {
      return;
    }

    removeElement(this._editFormComponent);
    this._editFormComponent = null;

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _handleEditSubmit(event) { // button save
    this._changeData(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      event,
    );
  }

  _deleteEditForm() {
    this.destroy();
    document.querySelector('.trip-main__event-add-btn').disabled = false;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }

    document.querySelector('.trip-main__event-add-btn').disabled = false;
  }
}
