import { render, RenderPosition, replaceElement, removeElement } from '../utils/render.js';
import { UserAction, UpdateType, Mode, State } from '../constans.js';

import Event from '../view/event.js';
import EditForm from '../view/edit-form.js';

export default class EventPresenter {
  constructor(eventsListContainer, changeData, changeMode) {
    this._eventsListContainer = eventsListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._eventComponent = null;
    this._editFormComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._replaceCardToForm = this._replaceCardToForm.bind(this);
    this._replaceFormToCard = this._replaceFormToCard.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleEditClickRollup = this._handleEditClickRollup.bind(this);
    this._handleEditSubmit = this._handleEditSubmit.bind(this);
    this._deleteEditForm = this._deleteEditForm.bind(this);
  }

  init(event, offers, destinations) {
    this._event = event;
    this._offers = offers;
    this._destinations = destinations;

    const prevEventComponent = this._eventComponent;
    const prevEditFormComponent = this._editFormComponent;

    this._eventComponent = new Event(event);
    this._editFormComponent = new EditForm(event, offers, destinations);

    this._eventComponent.setEditClickHandler(this._replaceCardToForm);        // event -> form
    this._eventComponent.setFavoriteClickHandler(this._handleFavoriteClick);  // event favorite button click

    this._editFormComponent.setEditClickHandler(this._handleEditClickRollup); // form -> event  | rollup
    this._editFormComponent.setEditSubmitHandler(this._handleEditSubmit);     // save | submit
    this._editFormComponent.setEditDeliteClickHandler(this._deleteEditForm);  // form -> event  | remove

    if (prevEventComponent === null || prevEditFormComponent === null) {
      render(this._eventsListContainer, this._eventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replaceElement(this._eventComponent, prevEventComponent);
    }

    if (this._mode === Mode.EDITING) {
      replaceElement(this._editFormComponent, prevEditFormComponent);
      this._mode = Mode.DEFAULT;
    }

    removeElement(prevEventComponent);
    removeElement(prevEditFormComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  destroy() {
    removeElement(this._eventComponent);  // this._element = null AND remove element from DOM
    removeElement(this._editFormComponent);
  }

  _deleteEditForm(event) {
    this._changeData(
      UserAction.DELETE_EVENT,
      UpdateType.MINOR,
      event,
    );

    // removeElement(this._editFormComponent); // this._element = null AND remove element from DOM
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._editFormComponent.reset(this._event);
      this._replaceFormToCard();
    }
  }

  _replaceCardToForm() { // call-back function to edit form
    replaceElement(this._editFormComponent, this._eventComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() { // call-back function to event
    replaceElement(this._eventComponent, this._editFormComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  setViewState(state) {
    if (this._mode === Mode.DEFAULT) {
      return;
    }

    const resetFormState = () => {
      this._editFormComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    switch (state) {
      case State.SAVING:
        this._editFormComponent.updateData({
          isDisabled: true,
          isSaving: true,
        });
        break;
      case State.DELETING:
        this._editFormComponent.updateData({
          isDisabled: true,
          isDeleting: true,
        });
        break;
      case State.ABORTING:
        this._eventComponent.shake(resetFormState);
        this._editFormComponent.shake(resetFormState);
        break;
    }
  }

  _handleEditClickRollup() {
    this._editFormComponent.reset(this._event);
    this._replaceFormToCard();
  }

  _handleEditSubmit(event) { // button save
    this._changeData(
      UserAction.UPDATE_EVENT,
      UpdateType.MINOR,
      event,
    );

    // this._replaceFormToCard();
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_EVENT,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._event,
        {'is_favorite': !this._event.is_favorite},
      ),
    );
  }
}
