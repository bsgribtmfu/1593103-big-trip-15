import { render, RenderPosition, removeElement } from './utils/render.js';
import { NavigationItem, UpdateType } from './constans.js';

import Api from './api.js';

import TripPresenter from './presenter/trip.js';
import Statistics from './view/statistics.js';
import FiltersPresenter from './presenter/filter.js';
import TripInfoPresenter from './presenter/trip-info.js';

import EventsModel from './model/events.js';
import FilterModel from './model/filter.js';
import OffersModel from './model/offers.js';
import DestinationsModel from './model/destination.js';

import TripInfoModel from './view/trip-info.js';
import Navigation from './view/navigation.js';

const tripInfoElement = document.querySelector('.trip-main');
const navigationContainer = document.querySelector('.trip-controls__navigation');
const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const addButton = document.querySelector('.trip-main__event-add-btn');

const AUTHORIZATION = 'Basic nkdp3Ppsfppf03dK';
const END_POINT = 'https://15.ecmascript.pages.academy/big-trip';

const api = new Api(END_POINT, AUTHORIZATION);

const eventsModel = new EventsModel();
const filterModel = new FilterModel();
const offersModel = new OffersModel();
const tripInfoModel = new TripInfoModel();
const destinationsModel = new DestinationsModel();

const navigationComponent = new Navigation();

const eventsPresenter = new TripPresenter(tripEventsElement, filtersContainer, eventsModel, filterModel, offersModel, destinationsModel, api);
const filterPresenter = new FiltersPresenter(filtersContainer, filterModel, eventsModel);
const tripInfoPresenter = new TripInfoPresenter(tripInfoElement, eventsModel, tripInfoModel);

addButton.disabled = true;

eventsPresenter.init();
filterPresenter.init();
tripInfoPresenter.init();

addButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  eventsPresenter.createEvent();
  addButton.disabled = true;
});

let statisticsComponent = null;

const handleSiteNavigationClick = (navigationItem) => {
  switch (navigationItem) {
    case NavigationItem.EVENTS:
      eventsPresenter.destroy();
      eventsPresenter.init();
      removeElement(statisticsComponent);
      statisticsComponent = null;
      navigationComponent.setNavigationItem(NavigationItem.EVENTS);
      document.querySelectorAll('.trip-filters__filter-input').forEach((filterInput) => filterInput.disabled = false);
      addButton.disabled = false;
      break;
    case NavigationItem.STATISTICS:
      if (statisticsComponent !== null) {
        return;
      }
      eventsPresenter.destroy();
      statisticsComponent = new Statistics(eventsModel.getEvents());
      render(tripEventsElement, statisticsComponent, RenderPosition.BEFOREEND);
      navigationComponent.setNavigationItem(NavigationItem.STATISTICS);
      document.querySelectorAll('.trip-filters__filter-input').forEach((filterInput) => filterInput.disabled = true);
      addButton.disabled = true;
      break;
  }
};

Promise.all([
  api.getEvents(),
  api.getOffers(),
  api.getDestinations(),
])
  .then((values) => {
    const [events, offers, destinations] = values;
    eventsModel.setEvents(UpdateType.INIT, events);
    offersModel.setOffers(UpdateType.INIT, offers);
    destinationsModel.setDestinations(UpdateType.INIT, destinations);
    render(navigationContainer, navigationComponent, RenderPosition.BEFOREEND);
    navigationComponent.setNavigationClickHandler(handleSiteNavigationClick);
    addButton.disabled = false;
  })
  .catch(() => {
    eventsModel.setEvents(UpdateType.INIT, []);
  });
