import { generateEvent } from './mock/data-structure.js';
import { render, RenderPosition } from './utils.js';

import TripInfo from './view/trip-info.js';
import Navigation from './view/navigation.js';
import FilterTemplate from './view/filters.js';
import Event from './view/event.js';
import EventsList from './view/events-list.js';
import Sort from './view/sort.js';
import EventItem from './view/event-item.js';
import EditForm from './view/edit-form.js';

const tripMain = document.querySelector('.trip-main');
const tripNavigation = document.querySelector('.trip-controls__navigation');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const EVENT_COUNT = 20;

const generateEvents = (count) => {
  const eventElements = [];

  for (let i = 0; i < count; i++) {
    eventElements.push(generateEvent());
  }

  return eventElements;
};

const events = generateEvents(EVENT_COUNT);

const replaceElement = (parentNode, newChild, oldChild) => {
  parentNode.replaceChild(newChild, oldChild);
};

const renderEvent = (eventItem, point) => {
  const eventComponent = new Event(point);
  const editFormComponent = new EditForm(point);

  render(eventItem, eventComponent.getElement(), RenderPosition.BEFOREEND);

  editFormComponent.getElement().querySelector('.event__reset-btn').addEventListener('click', () => {
    eventItem.remove();
    editFormComponent.removeElement();
  });

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceElement(eventItem, eventComponent.getElement(), editFormComponent.getElement()); // to event
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  editFormComponent.getElement().addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceElement(eventItem, eventComponent.getElement(), editFormComponent.getElement()); // to event
    document.removeEventListener('keydown', onEscKeyDown);
  });

  eventComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceElement(eventItem, editFormComponent.getElement(), eventComponent.getElement()); // to edit form
    document.addEventListener('keydown', onEscKeyDown);
  });

  editFormComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceElement(eventItem, eventComponent.getElement(), editFormComponent.getElement()); // to event
  });
};

const renderEventsList = (container, eventsObject) => {
  const eventList = new EventsList();

  render(container, eventList.getElement(), RenderPosition.BEFOREEND);

  eventsObject.map((event) => {
    const eventItem = new EventItem();

    render(eventList.getElement(), eventItem.getElement(), RenderPosition.BEFOREEND); // ренедерим <li>
    renderEvent(eventItem.getElement(), event); // ренедерим points и навешиваем события на кнопку каждой точки.
  });
};

render(tripMain, new TripInfo(events).getElement(), RenderPosition.AFTERBEGIN);
render(tripNavigation, new Navigation().getElement(), RenderPosition.BEFOREEND);
render(tripControlsFilters, new FilterTemplate().getElement(), RenderPosition.BEFOREEND);
render(tripEvents, new Sort().getElement(), RenderPosition.BEFOREEND);

renderEventsList(tripEvents, events);
