function mid(min, max, num) {
const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

const mid = (min, max, num) => {
  if (num >= max) return max;
  if (num <= min) return min;
  return num;
}

export { mid };