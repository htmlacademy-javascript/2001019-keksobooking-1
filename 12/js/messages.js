import { isEscapeKey } from './utils.js';

let successElement;

const closeSuccessMessage = () => {
  successElement.remove();
  document.removeEventListener('click', onSuccessMessageClick);
  document.removeEventListener('keydown', onSuccessMessageDocumentKeydown);
};

function onSuccessMessageClick() {
  closeSuccessMessage();
}

function onSuccessMessageDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    closeSuccessMessage();
  }
}

const showSuccess = () => {
  const successTemplate =
  document.querySelector('#success').content.querySelector('.success');
  successElement = successTemplate.cloneNode(true);
  document.body.appendChild(successElement);
  document.addEventListener('click', onSuccessMessageClick);
  document.addEventListener('keydown', onSuccessMessageDocumentKeydown);
};

let errorElement;
let errorButtonElement;

const closeErrorMessage = () => {
  errorElement.remove();
  errorButtonElement.removeEventListener('click', onErrorMessageCloseButtonClick);
  document.removeEventListener('click', onErrorMessageClick);
  document.removeEventListener('keydown', onErrorMessageDocumentKeydown);
};

function onErrorMessageClick() {
  closeErrorMessage();
}

function onErrorMessageCloseButtonClick() {
  closeErrorMessage();
}

function onErrorMessageDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    closeErrorMessage();
  }
}

const showError = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  errorElement = errorTemplate.cloneNode(true);
  document.body.appendChild(errorElement);

  errorButtonElement = errorElement.querySelector('.error__button');
  errorButtonElement.addEventListener('click', onErrorMessageCloseButtonClick);

  document.addEventListener('click', onErrorMessageClick);
  document.addEventListener('keydown', onErrorMessageDocumentKeydown);
};

export {showError, showSuccess};
