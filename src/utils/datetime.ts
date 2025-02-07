export const calculateDays = (beforeDay?: Date, afterDay?: Date) => {
  if (!beforeDay || !afterDay) {
    return 0;
  }

  const diffTime = Math.abs(afterDay.getTime() - beforeDay.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};