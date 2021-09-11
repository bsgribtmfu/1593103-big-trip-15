import { FilterType } from '../mock/constans.js';

import dayjs from 'dayjs';

const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => dayjs(event.date_from) >= dayjs('2021-09-17T15:06:54.5454Z')),
  [FilterType.PAST]: (events) => events.filter((event) => dayjs(event.date_to) <= dayjs('2021-09-17T15:06:54.5454Z')),
};

export { filter };
