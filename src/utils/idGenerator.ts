export const idGenerator = (ids: number[], increment = 1) => {
  let newId = Math.floor(Math.random() * 999 + increment);

  for (let id of ids) {
    if (newId === id) {
      newId = idGenerator(ids, increment * 7);
    }
  }

  return newId;
};
