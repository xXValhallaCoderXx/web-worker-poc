const someBigTask = (int) => {
  const sum = new Array(int)
    .fill(0)
    .map((el, index) => el + index)
    .reduce((sum, el) => sum + el, 0);
  console.log("SUM", sum);
};

export const runBigTask = (int) => {
  someBigTask(int);
  return `Done~~~`;
};
