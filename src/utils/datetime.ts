export const calculateDays = (
  beforeDay?: Date,
  afterDay?: Date,
  abs?: boolean,
) => {
  if (!beforeDay || !afterDay) {
    return 0;
  }

  beforeDay.setHours(0, 0, 0, 0);
  afterDay.setHours(0, 0, 0, 0);

  const diffTime = abs
    ? Math.abs(afterDay.getTime() - beforeDay.getTime())
    : afterDay.getTime() - beforeDay.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

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
    | 'timestamp',
) => {
  const dateObj = new Date(date);

  if (section === 'year') {
    return dateObj.getFullYear();
  }

  if (section === 'month') {
    const month = dateObj.getMonth() + 1;
    return month < 10 ? `0${month}` : `${month}`;
  }

  if (section === 'day') {
    const day = dateObj.getDate();
    return day < 10 ? `0${day}` : `${day}`;
  }

  if (section === 'hour') {
    const hour = dateObj.getHours();
    return hour < 10 ? `0${hour}` : `${hour}`;
  }

  if (section === 'minute') {
    const minute = dateObj.getMinutes();
    return minute < 10 ? `0${minute}` : `${minute}`;
  }

  if (section === 'second') {
    const second = dateObj.getSeconds();
    return second < 10 ? `0${second}` : `${second}`;
  }

  if (section === 'hh:mm') {
    const hour = dateObj.getHours();
    const minute = dateObj.getMinutes();
    return `${hour < 10 ? `0${hour}` : `${hour}`}:${minute < 10 ? `0${minute}` : `${minute}`}`;
  }

  if (section === 'timestamp') {
    return dateObj.getTime();
  }

  return 0;
};
