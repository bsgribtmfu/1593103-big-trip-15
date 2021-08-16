import { generateEvent } from './mock/data-structure.js';
import { render, RenderPosition, replaceElement } from './utils/render.js';

import TripInfo from './view/trip-info.js';
import Navigation from './view/navigation.js';
import Filter from './view/filters.js';
import Event from './view/event.js';
import EventsList from './view/events-list.js';
import Sort from './view/sort.js';
import EventItem from './view/event-item.js';
import EditForm from './view/edit-form.js';
import EmptyList from './view/empty-list.js';

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

const renderEvent = (eventItem, event) => {
  const eventComponent = new Event(event);
  const editFormComponent = new EditForm(event);

  render(eventItem, eventComponent, RenderPosition.BEFOREEND);

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceElement(eventItem, eventComponent, editFormComponent); // to event
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  eventComponent.setEditClickHandler(() => { // toggle to edit-form | main_button
    replaceElement(eventItem, editFormComponent, eventComponent);
    document.addEventListener('keydown', onEscKeyDown);
  });

  editFormComponent.removeElement(() => eventItem.remove());

  editFormComponent.setEditSubmitHandler(() => { // submit to event | submit
    replaceElement(eventItem, eventComponent, editFormComponent); // to event
    document.removeEventListener('keydown', onEscKeyDown);
  });

  editFormComponent.setEditClickHandler(() => { // click to event | main_button
    replaceElement(eventItem, eventComponent, editFormComponent); // to event
  });

  editFormComponent.setEditSaveClickHandler(() => { // click to event | save_button
    replaceElement(eventItem, eventComponent, editFormComponent); // to event
  });
};

const renderEventsList = (container, eventsObject) => {
  if(eventsObject.length === 0) {
    render(container, new EmptyList().getElement(), RenderPosition.BEFOREEND);
  } else {
    const eventList = new EventsList();

    render(container, eventList.getElement(), RenderPosition.BEFOREEND);
    render(tripMain, new TripInfo(events).getElement(), RenderPosition.AFTERBEGIN);

    eventsObject.forEach((event) => {
      const eventItem = new EventItem();

      render(eventList.getElement(), eventItem.getElement(), RenderPosition.BEFOREEND); // ренедерим <li>
      renderEvent(eventItem.getElement(), event); // ренедерим events и навешиваем события на кнопку каждой точки.
    });
  }
};

const renderFilter = () => {
  const filter = new Filter();
  render(tripControlsFilters, filter, RenderPosition.BEFOREEND);
};

renderFilter();

render(tripNavigation, new Navigation(), RenderPosition.BEFOREEND);
render(tripEvents, new Sort(), RenderPosition.BEFOREEND);

renderEventsList(tripEvents, events);


