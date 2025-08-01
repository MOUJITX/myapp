import moment from 'moment';

export const calculateDays = (
  beforeDay?: Date,
  afterDay?: Date,
  abs?: boolean,
) => {
  if (!beforeDay || !afterDay) {
    return 0;
  }

  const diff = moment(afterDay).diff(beforeDay, 'days');

  return abs ? Math.abs(diff) : diff;
};

const addZero = (num: number) => (num < 10 ? `0${num}` : num);

export const formatDate = (
  date: Date,
  section:
    | 'year'
    | 'month'
    | 'day'
    | 'hour'
    | 'minute'
    | 'second'
    | 'hh:mm'
    | 'yyyy-MM-dd'
    | 'timestamp',
) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = addZero(dateObj.getMonth() + 1);
  const day = addZero(dateObj.getDate());
  const hour = addZero(dateObj.getHours());
  const minute = addZero(dateObj.getMinutes());
  const second = addZero(dateObj.getSeconds());
  const timestamp = dateObj.getTime();

  if (section === 'year') return year;
  if (section === 'month') return month;
  if (section === 'day') return day;
  if (section === 'hour') return hour;
  if (section === 'minute') return minute;
  if (section === 'second') return second;
  if (section === 'hh:mm') return `${hour}:${minute}`;
  if (section === 'yyyy-MM-dd') return `${year}-${month}-${day}`;
  if (section === 'timestamp') return timestamp;

  return 0;
};
