import dayjs from "dayjs";

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};

const genRandomItemFrom = (array) => {
  const randomIndex = getRandomIntInclusive(0, array.length - 1);
  return array[randomIndex];
};

const sortByDate = (points) => points.sort((a, b) => dayjs(a.date_from) - dayjs(b.date_from));


export { getRandomIntInclusive, genRandomItemFrom, sortByDate };
