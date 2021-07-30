import { tripInfo } from './view/trip-info.js';
import { navigation } from './view/navigation.js';
import { filters } from './view/filters.js';
import { tripSort } from './view/trip-sort.js';
import { point } from './view/point.js';
import { eventsList } from './view/events-list.js';
import { editForm } from './view/edit-form.js';
import { addForm } from './view/add-form.js';

const tripMain = document.querySelector('.trip-main');
const tripNavigation = document.querySelector('.trip-controls__navigation');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const render = (element, position, template) => {
  element.insertAdjacentHTML(position, template);
};

render(tripMain, 'afterbegin', tripInfo());
render(tripNavigation, 'beforeend', navigation());
render(tripControlsFilters, 'beforeend', filters());
render(tripEvents, 'beforeend', tripSort());
render(tripEvents, 'beforeend', eventsList());

const listEvents = document.querySelector('.trip-events__list');
const points = new Array(4).fill();

points.forEach((_, index) => {
  if(index === 0) {
    render(listEvents, 'beforeend', `<li class='trip-events__item'>${editForm()}</li>`);
    render(listEvents, 'beforeend', `<li class='trip-events__item'>${addForm()}</li>`);
  } else {
    render(listEvents, 'beforeend', `<li class='trip-events__item'>${point()}</li>`);
  }
});
