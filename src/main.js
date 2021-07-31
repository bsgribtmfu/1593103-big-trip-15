import { tripInfo } from './view/trip-info.js';
import { navigation } from './view/navigation.js';
import { filters } from './view/filters.js';
import { tripSort } from './view/trip-sort.js';
import { event } from './view/event.js';
import { editForm } from './view/edit-form.js';
import { addForm } from './view/add-form.js';

const tripMain = document.querySelector('.trip-main');
const tripNavigation = document.querySelector('.trip-controls__navigation');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const render = (element, position, template) => {
  element.insertAdjacentHTML(position, template);
};

const points = new Array(3).fill();

const eventsList = () => (
  `<ul class="trip-events__list">
    <li class='trip-events__item'>${editForm()}</li>
    <li class='trip-events__item'>${addForm()}</li>
    ${points.map(() => `<li class='trip-events__item'>${event()}</li>`).join('')}
  </ul>`
);

render(tripMain, 'afterbegin', tripInfo());
render(tripNavigation, 'beforeend', navigation());
render(tripControlsFilters, 'beforeend', filters());
render(tripEvents, 'beforeend', tripSort());
render(tripEvents, 'beforeend', eventsList());
