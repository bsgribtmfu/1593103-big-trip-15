import { getFirstLetter } from './common.js';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const sortByDate = (a, b) => dayjs(a.date_from) - dayjs(b.date_from);

const getDiff = (from, to) => dayjs(to).diff(dayjs(from));

const getDuration = (from, to) => dayjs.duration(getDiff(from, to));

const humanizeEventDate = (date, format) => dayjs(date).format(format);

const getDiffDuration = (a, b) => getDiff(a.date_from, a.date_to) - getDiff(b.date_from, b.date_to);

const humanizeEventDurationDate = (date) => {
  let resultDateDiff = '';

  Object
    .keys(date)
    .forEach((key) => {
      if(date[key] !== 0 && key !== 'seconds' && key !== 'milliseconds') {
        resultDateDiff += `${date[key]}${getFirstLetter(key)} `;
      }
    });

  return resultDateDiff;
};

export const msToTime = (duration) => {
  const milliseconds = parseInt((duration % 1000) / 100);
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  const years = Math.floor(duration / (1000 * 60 * 60 * 24 * 30 * 12));
  const months = Math.floor(duration / (1000 * 60 * 60 * 24 * 30) % 12);
  const days = Math.floor(duration / (1000 * 60 * 60 * 24) % 30);

  return ({
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
  });

};

export {
  sortByDate,
  getDuration,
  humanizeEventDate,
  getDiffDuration,
  getDiff,
  humanizeEventDurationDate
};
