import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const sortByDate = (events) => events.sort((a, b) => dayjs(a.date_from) - dayjs(b.date_from));

const differenceDate = (dateFrom, dateTo) => {
  const from = dayjs(dateFrom);
  const to = dayjs(dateTo);

  return dayjs.duration(to.diff(from)).format();
};

const humanizeEventDate = (date, format) => dayjs(date).format(format);

// const getDiffDuration = (a, b) => {
//
// }

export {
  sortByDate,
  differenceDate,
  humanizeEventDate
};
