import { tripInfo } from './view/trip-info.js';
import { navigation } from './view/navigation.js';
import { filters } from './view/filters.js';
import { tripSort } from './view/trip-sort.js';
import { event } from './view/event.js';
import { editForm } from './view/edit-form.js';
import { addForm } from './view/add-form.js';
import { generatePoint } from './mock/data-structure.js';
import { render } from './utils.js';

const tripMain = document.querySelector('.trip-main');
const tripNavigation = document.querySelector('.trip-controls__navigation');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const POINT_COUNT = 20;

const generatePoints = (count) => {
  const pointsElements = [];

  for (let i = 0; i < count; i++) {
    pointsElements.push(generatePoint());
  }

  return pointsElements;
};

const points = generatePoints(POINT_COUNT);

const eventsList = () => (
  `<ul class="trip-events__list">
    <li class='trip-events__item'>${editForm(points[0])}</li>
    <li class='trip-events__item'>${addForm()}</li>
    ${points.map((point) => `<li class='trip-events__item'>${event(point)}</li>`).join('')}
  </ul>`
);

render(tripMain, 'afterbegin', tripInfo(points));
render(tripNavigation, 'beforeend', navigation());
render(tripControlsFilters, 'beforeend', filters());
render(tripEvents, 'beforeend', tripSort());
render(tripEvents, 'beforeend', eventsList());
