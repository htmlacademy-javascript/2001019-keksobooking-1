const adForm = document.querySelector('.ad-form');
const roomsElement = adForm.querySelector('[name="rooms"]');
const capacityElement = adForm.querySelector('[name="capacity"]');
const titleElement = adForm.querySelector('#title');
const timeInElement = adForm.querySelector('#timein');
const timeOutElement = adForm.querySelector('#timeout');
const typeElement = adForm.querySelector('#type');
const priceElement = adForm.querySelector('#price');
const addressElement = adForm.querySelector('#address');

const capacityOption = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

const minPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const MAX_PRICE = 100000;

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

function validateTitle (value) {
  return value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH;
}

function validatePrice (value) {
  return value < MAX_PRICE;
}

function validateCapacity () {
  return capacityOption[roomsElement.value].includes(capacityElement.value);
}

function syncCheckOutTime () {
  timeOutElement.value = timeInElement.value;
}

function syncCheckInTime () {
  timeInElement.value = timeOutElement.value;
}

function validateMinPrice () {
  const selectedType = adForm.querySelector('#type option:checked');
  return parseInt(priceElement.value, 10) >= minPrice[selectedType.value];
}

function getPriceErrorMessage () {
  const selectedType = adForm.querySelector('#type option:checked');
  return `Стоимость за сутки не может быть менее ${minPrice[selectedType.value]} рублей.`;
}

const initValidation = (onSuccess) => {
  const pristine = new Pristine(adForm, {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    successClass: 'ad-form__element--valid',
    errorTextParent: 'ad-form__element',
    errorTextTag: 'span',
    errorTextClass: 'ad-form__error'
  }, false);

  pristine.addValidator(titleElement, validateTitle, 'Заголовок должен быть от 30 до 100 символов!)');
  pristine.addValidator(priceElement, validatePrice, 'Цена за ночь не может быть выше 100000!');
  pristine.addValidator(roomsElement, validateCapacity, 'Увеличьте количество комнат или уменьшите количество гостей.');
  pristine.addValidator(capacityElement, validateCapacity, 'Увеличьте количество комнат или уменьшите количество гостей.');
  pristine.addValidator(typeElement, validateMinPrice, 'Выберите другой тип жилья или увеличьте цену');
  pristine.addValidator(priceElement, validateMinPrice, getPriceErrorMessage);

  timeInElement.addEventListener('change', syncCheckOutTime);
  timeOutElement.addEventListener('change', syncCheckInTime);

  addressElement.disabled = true;

  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      onSuccess();
    }

  });
};

export {initValidation};
