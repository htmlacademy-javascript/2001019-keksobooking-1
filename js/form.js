import { isEscapeKey } from './utils.js';

const mapFilters = document.querySelector('.map__filters');
const filters = mapFilters.querySelectorAll('select, input');
const addForm = document.querySelector('.ad-form');
const fields = addForm.querySelectorAll('input, textarea, select, button');
const sendButton = addForm.querySelector('.ad-form__submit');
const bodyElement = document.querySelector('body');

const submitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const getFormData = () => new FormData(addForm);

const resetForm = () => {
  addForm.reset();
};

const showFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  filters.forEach((filter) => {
    filter.disabled = false;
  });
  const popups = document.querySelectorAll('.popup');
  popups.forEach((popup) => {
    popup.classList.remove('hidden');
  });
};

const hideFilters = () => {
  mapFilters.classList.add('map__filters--disabled');
  filters.forEach((filter) => {
    filter.disabled = true;
  });
  const popups = document.querySelectorAll('.popup');
  popups.forEach((popup) => {
    popup.classList.add('hidden');
  });
};


const showForm = () => {
  addForm.classList.remove('ad-form--disabled');
  sendButton.disabled = false;
  fields.forEach((field) => {
    field.disabled = false;
  });
};

const hideForm = () => {
  addForm.classList.add('ad-form--disabled');
  sendButton.disabled = true;
  fields.forEach((field) => {
    field.disabled = true;
  });
};

const showSuccess = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successElement = successTemplate.cloneNode(true);
  bodyElement.appendChild(successElement);

  document.addEventListener('click', () => {
    successElement.remove();

  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      successElement.remove();
    }
  });
};

const showError = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorTemplate.cloneNode(true);
  bodyElement.appendChild(errorElement);
  const errorButtonElement = errorElement.querySelector('.error__button');

  errorButtonElement.addEventListener('click', () => {
    errorElement.classList.add('hidden');
  });

  document.addEventListener('click', () => {
    errorElement.classList.add('hidden');
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      errorElement.classList.add('hidden');
    }
  });
};

const blockSubmitButton = () => {
  sendButton.disabled = true;
  sendButton.textContent = submitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  sendButton.disabled = false;
  sendButton.textContent = submitButtonText.IDLE;
};

export {showFilters, hideFilters, showForm, hideForm, resetForm, showError, showSuccess, getFormData, blockSubmitButton, unblockSubmitButton};
