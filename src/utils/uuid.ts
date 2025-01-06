export const UUIDv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.floor(Math.random() * 16),
      v = c === 'x' ? r : (r % 4) * 2 + 8;
    return v.toString(16);
  });
};
