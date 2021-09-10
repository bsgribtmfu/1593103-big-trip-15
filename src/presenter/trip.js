import { render, RenderPosition, removeElement } from '../utils/render.js';
import { sortByPrice } from '../utils/common.js';
import { getDiffDuration } from '../utils/date.js';
import { SortType, UpdateType, UserAction } from '../mock/constans.js';

import EventsList from '../view/events-list.js';
import EmptyList from '../view/empty-list.js';
import Sort from '../view/sort.js';
import TripInfo from '../view/trip-info.js';
import EventPresenter from './event.js';
import Navigation from '../view/navigation.js';
import Filters from '../view/filters.js';

export default class Trip {
  constructor(mainContainer, tripSummaryContainer, navigationContainer, filtersContainer, eventsModel) {
    this._mainContainer = mainContainer;
    this._tripSummaryContainer = tripSummaryContainer;
    this._navigationContainer = navigationContainer;
    this._filtersContainer = filtersContainer;
    this._eventsModel = eventsModel; // model

    this._currentSortType = SortType.DEFAULT;

    this._eventPresenter = new Map(); // events

    this._navigation = new Navigation();
    this._eventsList = new EventsList();
    this._emptyList = new EmptyList();
    this._sort = null;
    this._filters = new Filters();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._eventsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderTrip();
  }

  _getEvents() { // получаем все точки
    switch (this._currentSortType) {
      case SortType.TRIP_TIME:
        return this._eventsModel.getEvents().slice().sort(getDiffDuration);
      case SortType.PRICE_UP:
        return this._eventsModel.getEvents().slice().sort(sortByPrice);
    }
    return this._eventsModel.getEvents();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._eventsModel.updateEvents(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this._eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this._eventsModel.deleteEvent(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        // обновить часть списка (например, когда поменялось описание)
        this._eventPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this._clearBoard({ resetSortType: true });
        this._renderBoard();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearEventList();
    this._renderEvents(this._getEvents()); // здесь была ошибка, правильно ли так???? уточнить
  }

  _handleModeChange() {
    this._eventPresenter.forEach((presenter) => presenter.resetView());
  }

  _clearEventList() {
    this._eventPresenter.forEach((presenter) => presenter.destroy());
    this._eventPresenter.clear();
  }

  _renderFilters() {
    render(this._filtersContainer, this._filters, RenderPosition.BEFOREEND);
  }

  _renderNavigation() {
    render(this._navigationContainer, this._navigation, RenderPosition.BEFOREEND);
  }

  _renderEventsList() {
    render(this._mainContainer, this._eventsList, RenderPosition.BEFOREEND);
  }

  _renderEmptyList() {
    render(this._mainContainer, this._emptyList, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    if (this._sort !== null) {
      this._sort = null;
    }

    this._sort = new Sort(this._currentSortType); // не принимаю в классе Sort???
    this._sort.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._mainContainer, this._sort, RenderPosition.BEFOREEND);
  }

  _renderTripInfo() {
    this._tripInfo = new TripInfo(this._eventsModel.getEvents()); // аргумент тот?
    render(this._tripSummaryContainer, this._tripInfo, RenderPosition.AFTERBEGIN);
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventsList, this._handleViewAction, this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenter.set(event.id, eventPresenter);
  }

  _renderEvents(events) {
    events.forEach((event) => this._renderEvent(event));
  }

  _clearBoard({ resetSortType = false } = {}) {

    this._eventPresenter.forEach((presenter) => presenter.destroy());
    this._eventPresenter.clear();

    removeElement(this._sort);
    removeElement(this._renderEmptyList);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderTrip() {
    const events = this._getEvents();
    const eventCount = events.length;

    if (eventCount === 0) {
      this._renderEmptyList();
      this._renderNavigation();
      this._renderFilters();
      return;
    }
    this._renderNavigation();
    this._renderFilters();
    this._renderTripInfo();
    this._renderSort();
    this._renderEventsList();
    this._renderEvents(events);
  }
}
