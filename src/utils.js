function mid(min, max, num) {
  if (num >= max) return max;
  if (num <= min) return min;
  return num;
}

export { mid };