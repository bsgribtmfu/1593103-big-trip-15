import { SortType, UpdateType, UserAction, FilterType, State } from '../constans.js';
import { render, RenderPosition, removeElement } from '../utils/render.js';
import { sortByPrice } from '../utils/common.js';
import { sortByDate, getDiffDuration } from '../utils/date.js';
import { filter } from '../utils/filter.js';

import LoadingView from '../view/loading.js';
import EventsList from '../view/events-list.js';
import EmptyList from '../view/empty-list.js';
import Sort from '../view/sort.js';

import NewEventPresenter from './new-event.js';
import EventPresenter from './event.js';

export default class Trip {
  constructor(mainContainer, filtersContainer, eventsModel, filterModel, offersModel, destinationsModel, api) {
    this._mainContainer = mainContainer;
    this._filtersContainer = filtersContainer;

    this._eventsModel = eventsModel;
    this._filterModel = filterModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;

    this._api = api;

    this._filterType = FilterType.EVERYTHING;
    this._currentSortType = SortType.DEFAULT;

    this._eventPresenter = new Map();

    this._listComponent = new EventsList();
    this._loadingComponent = new LoadingView();
    this._noEventsComponent = null;
    this._sortComponent = null;

    this._isLoading = true;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._newEventPresenter = new NewEventPresenter(this._listComponent, this._handleViewAction);
    this._addButton = document.querySelector('.trip-main__event-add-btn');
  }

  init() {
    render(this._mainContainer, this._listComponent, RenderPosition.BEFOREEND);

    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._offersModel.addObserver(this._handleModelEvent);
    this._destinationsModel.addObserver(this._handleModelEvent);

    this._renderTrip();
  }

  destroy() {
    this._clearTrip({ resetSortType: true });

    removeElement(this._listComponent);
    removeElement(this._sortComponent);

    this._eventsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
    this._offersModel.removeObserver(this._handleModelEvent);
    this._destinationsModel.removeObserver(this._handleModelEvent);
  }

  createEvent() {
    this._offers = this._offersModel.getOffers();
    this._destinations = this._destinationsModel.getDestinations();

    this._currentSortType = SortType.DEFAULT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._newEventPresenter.init(this._offers, this._destinations);
  }

  _getEvents() {
    this._filterType = this._filterModel.getFilter();
    const events = this._eventsModel.getEvents();
    const filtredEvents = filter[this._filterType](events);

    switch (this._currentSortType) {
      case SortType.TRIP_TIME:
        return filtredEvents.sort(getDiffDuration);
      case SortType.PRICE_UP:
        return filtredEvents.sort(sortByPrice);
    }

    return filtredEvents.sort(sortByDate);
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._eventPresenter.get(update.id).setViewState(State.SAVING);
        this._api.updateEvent(update).then((response) => {
          this._eventsModel.updateEvent(updateType, response);
        })
          .catch(() => {
            this._eventPresenter.get(update.id).setViewState(State.ABORTING);
          });
        break;
      case UserAction.ADD_EVENT:
        this._newEventPresenter.setSaving();
        this._api.addEvent(update).then((response) => {
          this._eventsModel.addEvent(updateType, response);
        })
          .catch(() => {
            this._newEventPresenter.setAborting();
          });
        break;
      case UserAction.DELETE_EVENT:
        this._eventPresenter.get(update.id).setViewState(State.DELETING);
        this._api.deleteEvent(update).then(() => {
          this._eventsModel.deleteEvent(updateType, update);
        })
          .catch(() => {
            this._eventPresenter.get(update.id).setViewState(State.ABORTING);
          });
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._offers = this._offersModel.getOffers();
        this._destinations = this._destinationsModel.getDestinations();
        this._eventPresenter.get(data.id).init(data, this._offers, this._destinations);
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({ resetSortType: true });
        this._renderTrip();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        removeElement(this._loadingComponent);
        this._clearTrip({ resetSortType: true });
        this._renderTrip();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearEventList();
    this._renderEvents(this._getEvents());
  }

  _handleModeChange() {
    this._newEventPresenter.destroy();
    this._eventPresenter.forEach((presenter) => presenter.resetView());
  }

  _clearEventList() {
    this._eventPresenter.forEach((presenter) => presenter.destroy());
    this._eventPresenter.clear();
  }

  _renderLoading() {
    render(this._mainContainer, this._loadingComponent, RenderPosition.BEFOREEND);
  }

  _renderEmptyList() {
    this._noEventsComponent = new EmptyList(this._filterType);
    render(this._mainContainer, this._noEventsComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new Sort(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._mainContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEvent(event) {
    this._offers = this._offersModel.getOffers();
    this._destinations = this._destinationsModel.getDestinations();

    const eventPresenter = new EventPresenter(this._listComponent, this._handleViewAction, this._handleModeChange);
    eventPresenter.init(event, this._offers, this._destinations);
    this._eventPresenter.set(event.id, eventPresenter);
  }

  _renderEvents(events) {
    events.forEach((event) => this._renderEvent(event));
  }

  _clearTrip({resetSortType = false} = {}) {
    this._newEventPresenter.destroy();
    this._eventPresenter.forEach((presenter) => presenter.destroy());
    this._eventPresenter.clear();

    removeElement(this._sortComponent);
    removeElement(this._loadingComponent);

    if (this._noEventsComponent) {
      removeElement(this._noEventsComponent);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }

    this._addButton.disabled = false;
  }

  _renderTrip() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const events = this._getEvents();

    const eventCount = events.length;

    if (eventCount === 0) {
      this._renderEmptyList();
      return;
    }
    this._renderSort();
    this._renderEvents(events);
  }
}
