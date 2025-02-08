export const calculateDays = (
  beforeDay?: Date,
  afterDay?: Date,
  abs?: boolean
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
