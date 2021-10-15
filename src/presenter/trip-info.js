import { render, RenderPosition, replaceElement, removeElement } from '../utils/render.js';

import TripInfo from '../view/trip-info.js';

export default class TripInfoPresenter {
  constructor(tripInfoContainer, eventsModel) {
    this._tripInfoContainer = tripInfoContainer;
    this._eventsModel = eventsModel;

    this._tripInfoComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._eventsModel.addObserver(this._handleModelEvent);

  }

  init() {
    this._events = this._eventsModel.getEvents();

    if(this._events.length === 0) {
      return;
    }

    this._renderTripInfo();
  }

  _renderTripInfo() {
    const prevTripInfoComponent = this._tripInfoComponent;

    this._tripInfoComponent = new TripInfo(this._events);

    if (prevTripInfoComponent === null) {
      render(this._tripInfoContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    replaceElement(this._tripInfoComponent, prevTripInfoComponent);
    removeElement(prevTripInfoComponent);
  }

  _handleModelEvent() {
    this.init();
  }
}
