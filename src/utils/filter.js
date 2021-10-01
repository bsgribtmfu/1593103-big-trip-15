import { FilterType } from '../mock/constans.js';

import dayjs from 'dayjs';

const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => dayjs(event.date_from) >= dayjs()),
  [FilterType.PAST]: (events) => events.filter((event) => dayjs(event.date_to) <= dayjs()),
};

export { filter };
