const someBigTask = (int) =>
  new Array(int)
    .fill(0)
    .map((el, index) => el + index)
    .reduce((sum, el) => sum + el, 0);

export const runBigTask = (int) => {
  return someBigTask(int);
};

export const randomRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
