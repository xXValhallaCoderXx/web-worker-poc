/* eslint-disable no-restricted-globals */

self.onmessage = (e) => {
  const { data } = e;
  console.log(`[From Main]`, data);
  self.postMessage({ type: "SUM", data });
};
