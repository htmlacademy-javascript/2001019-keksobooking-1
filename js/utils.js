const ALERT_SHOW_TIME = 5000;

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

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomArrayElement, getRandomNumber, shuffleArray, showAlert, isEscapeKey};
