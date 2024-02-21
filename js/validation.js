const adForm = document.querySelector('.ad-form');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error'
});

function validateTitle (value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator(
  adForm.querySelector('#title'),
  validateTitle,
  'Заголовок должен быть от 30 до 100 символов!)'
);

function validatePrice (value) {
  return value < 100000;
}

pristine.addValidator(
  adForm.querySelector('#price'),
  validatePrice,
  'Цена за ночь не может быть выше 100000!'
);

const roomCount = adForm.querySelector('[name="rooms"]');
const capacityAmount = adForm.querySelector('[name="capacity"]');
const capacityOption = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

function validateCapacity () {
  return capacityOption[roomCount.value].includes(capacityAmount.value);
}

pristine.addValidator(roomCount, validateCapacity, 'Увеличьте количество комнат или уменьшите количество гостей.');
pristine.addValidator(capacityAmount, validateCapacity, 'Увеличьте количество комнат или уменьшите количество гостей.');


const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

function validateCheckinTime () {
  const timeInSelected = adForm.querySelector('#timein option:checked');
  adForm.querySelector('#timeout').value = timeInSelected.value;

  return true;
}

function validateCheckoutTime () {
  const timeOutSelected = adForm.querySelector('#timeout option:checked');
  adForm.querySelector('#timein').value = timeOutSelected.value;

  return true;
}

pristine.addValidator(timeIn, validateCheckinTime, 'Вы можете пребывать не более суток');
pristine.addValidator(timeOut, validateCheckoutTime, 'Вы можете пребывать не более суток');

const typeField = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const minPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace':10000
};

function validateMinPrice () {
  const selectedType = adForm.querySelector('#type option:checked');
  return parseInt(price.value, 10) >= minPrice[selectedType.value];
}

function getPriceErrorMessage () {
  const selectedType = adForm.querySelector('#type option:checked');
  return `Стоимость за сутки не может быть менее ${minPrice[selectedType.value]} рублей.`;
}
pristine.addValidator(typeField, validateMinPrice, 'Выберите другой тип жилья или увеличьте цену');
pristine.addValidator(price, validateMinPrice, getPriceErrorMessage);

const addressField = adForm.querySelector('#address');
addressField.disabled = true;

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
