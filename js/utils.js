const getRandomNumber = (min, max, count = 0) => Number((Math.abs(min) + Math.random() * (Math.abs(max) - Math.abs(min))).toFixed(count));

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const shuffleArray = (arr) => {
  const result = [];
  const length = getRandomNumber(1, arr.length - 1);

  for (let i = 0; i < length; i++) {
    const item = arr[getRandomNumber(0, (arr.length - 1))];
    if (!result.includes(item)) {
      result.push(item);
    }
  }

  return result;
};

export {getRandomArrayElement, getRandomNumber, shuffleArray};
