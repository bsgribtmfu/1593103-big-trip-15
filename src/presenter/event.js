import { render, RenderPosition, replaceElement, remove } from '../utils/render.js';

import Event from '../view/event.js';
import EditForm from '../view/edit-form.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class EventPresenter {
  constructor(eventsListConteiner, changeData, changeMode) {
    this._eventsListConteiner = eventsListConteiner;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._eventComponent = null;
    this._editFormComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._replaceCardToForm = this._replaceCardToForm.bind(this);
    this._replaceFormToCard = this._replaceFormToCard.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleEditFormSave = this._handleEditFormSave.bind(this);
    this._removeEditForm = this._removeEditForm.bind(this);
  }

  init(event) {
    this._event = event;

    const prevEventComponent = this._eventComponent;
    const prevEditFormComponent = this._eventComponent;

    this._eventComponent = new Event(event);
    this._editFormComponent = new EditForm(event);

    this._eventComponent.setEditClickHandler(this._replaceCardToForm);        // event -> form
    this._editFormComponent.setEditClickHandler(this._replaceFormToCard);     // form -> event  | main
    this._editFormComponent.setEditSaveClickHandler(this._handleEditFormSave); // form -> event  | save
    this._editFormComponent.setEditDeliteClickHandler(this._removeEditForm);  // form -> event  | delite
    this._eventComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevEventComponent === null || prevEditFormComponent === null) {
      render(this._eventsListConteiner, this._eventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replaceElement(this._eventComponent, prevEventComponent);
    }

    if (this._mode === Mode.EDITING) {
      replaceElement(this._editFormComponent, prevEditFormComponent);
    }

    remove(prevEventComponent);     // this._element = null AND remove element from DOM
    remove(prevEditFormComponent);  // this._element = null AND remove element from DOM
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._editFormComponent);
  }

  _removeEditForm() {
    remove(this._editFormComponent); // this._element = null AND remove element from DOM
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceFormToCard();
    }
  }

  _replaceCardToForm() { // call-back функция to edit form
    replaceElement(this._editFormComponent, this._eventComponent);
    document.addEventListener('keydown', this._escKeyDownHandler); // вешаем ф-ю обработчик нажатия клавиши esc
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() { // call-back функция to event
    replaceElement(this._eventComponent, this._editFormComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _handleEditFormSave(event) {
    // this._changeData(event); // так я и не понял где "собака зарыта" ...
    this._replaceFormToCard();
  }

  _handleFavoriteClick() {
    this._changeData(Object.assign({}, this._event, {is_favorite: !this._event.is_favorite}));
  }
}
