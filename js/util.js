function getRandomNumber(min, max, count = 0) {
  return Number((Math.abs(min) + Math.random() * (Math.abs(max) - Math.abs(min))).toFixed(count));
}

console.log(getRandomNumber(1, 10));

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

export {getRandomArrayElement, getRandomNumber};
