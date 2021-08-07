import { genRandomItemFrom } from '../utils.js';

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration); // куда это запихнуть? в ф-ю нельзя, этой штуке нужна глобальная область видимости.

const differenceDate = (dateFrom, dateTo) => { // может эту ф-ю закинуть в utils.js ?
  const from = dayjs(dateFrom);
  const to = dayjs(dateTo);

  return dayjs.duration(to.diff(from));
};

export const event = (point) => {
  const {
    base_price: basePrice,
    date_from: dateFrom,
    date_to: dateTo,
    destination: {
      name,
    },
    is_favorite: isFavorite,
    offers,
    type,
  } = point;

  const diffDate = differenceDate(dateFrom, dateTo);

  const offer = genRandomItemFrom(offers);
  const { title: offerTitle, price: offerPrice } = offer;

  const buttonFavorite = isFavorite !== false || 'event__favorite-btn--active';

  return (
    `<div class="event">
    <time class="event__date" datetime="${dayjs(dateFrom).format('YYYY-MM-DD')}">${dayjs(dateFrom).format('DD MMM')}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event ${type} icon">
    </div>
    <h3 class="event__title">${type} ${name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${dayjs(dateFrom).format('YYYY-MM-DD')}">${dayjs(dateFrom).format('HH:MM')}</time>
        &mdash;
        <time class="event__end-time" datetime="${dayjs(dateTo).format('YYYY-MM-DD')}">${dayjs(dateTo).format('HH:MM')}</time>
      </p>
      <p class="event__duration">${diffDate.$d.hours}H ${diffDate.$d.minutes}M</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      <li class="event__offer">
        <span class="event__offer-title">${offerTitle}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offerPrice}</span>
      </li>
    </ul>
    <button class="event__favorite-btn ${buttonFavorite}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>`
  );
};