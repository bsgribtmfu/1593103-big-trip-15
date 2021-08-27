import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const sortByDate = (events) => events.sort((a, b) => dayjs(a.date_from) - dayjs(b.date_from));

const getDiff = (from, to) => dayjs(to).diff(dayjs(from));

const getDuration = (from, to) => dayjs.duration(getDiff(from, to));

const humanizeEventDate = (date, format) => dayjs(date).format(format);

const getDiffDuration = (a, b) => getDiff(a.date_from, a.date_to) - getDiff(b.date_from, b.date_to);

export {
  sortByDate,
  getDuration,
  humanizeEventDate,
  getDiffDuration
};
