import Abstract from './abstract.js';

const generateFilterItem = (filterType, currentFilterType) => (
  `<div class="trip-filters__filter">
    <input id="filter-${filterType}" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="${filterType}" ${filterType === currentFilterType ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${filterType}">${filterType}</label>
  </div>`
);

const generateFilters = (filters, currentFilterType) => {

  const filterItems = filters.map((filter) => generateFilterItem(filter.type, currentFilterType)).join('');

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterItems}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class Filter extends Abstract {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilterType = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return generateFilters(this._filters, this._currentFilterType);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('change', this._filterTypeChangeHandler);
  }
}
