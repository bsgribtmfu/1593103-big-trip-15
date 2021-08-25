import { render, RenderPosition } from '../utils/render.js';
import { updateItem } from '../utils/common.js';

import EventsList from '../view/events-list.js';
import EmptyList from '../view/empty-list.js';
import Sort from '../view/sort.js';
import TripInfo from '../view/trip-info.js';
import EventPresenter from './event.js';
import Navigation from '../view/navigation.js';
import Filters from '../view/filters.js';

export default class Trip {
  constructor(mainContainer, tripSummaryContainer, navigationContainer, filtersContainer) {
    this._mainContainer = mainContainer;
    this._tripSummaryContainer = tripSummaryContainer;
    this._navigationContainer = navigationContainer;
    this._filtersContainer = filtersContainer;

    this._eventPresenter = new Map(); // events

    this._navigation = new Navigation();
    this._eventsList = new EventsList();
    this._emptyList = new EmptyList();
    this._sort = new Sort();
    this._filters = new Filters();

    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(events) {
    this._events = [...events];
    this._renderTrip();
  }

  _handleModeChange() {
    this._eventPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleEventChange(updatedEvent) {
    this._events = updateItem(this._events, updatedEvent);
    this._eventPresenter.get(updatedEvent.id).init(updatedEvent);
  }

  _clearEventList() {
    this.eventPresenter.forEach((presenter) => presenter.destroy());
    this.eventPresenter.clear();
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
    render(this._mainContainer, this._sort, RenderPosition.BEFOREEND);
  }

  _renderTripInfo() {
    this._tripInfo = new TripInfo(this._events);
    render(this._tripSummaryContainer, this._tripInfo, RenderPosition.AFTERBEGIN);
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventsList, this._handleEventChange, this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenter.set(event.id, eventPresenter);
  }

  _renderEvents() {
    this._events.forEach((event) => {
      this._renderEvent(event);
    });
  }

  _renderTrip() {
    if(this._events.length === 0) {
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
    this._renderEvents();
  }
}
