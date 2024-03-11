import { initValidation } from './validation.js';
import { createMarkers, initMap, resetAddress } from './map.js';
import { initSlider, resetSlider } from './slider.js';
import { hideFilters, hideForm, showFilters, showForm, resetForm, showSuccess, showError, getFormData, blockSubmitButton, unblockSubmitButton } from './form.js';
import { getOffers, sendData } from './api.js';
import { showAlert } from './utils.js';


const OFFERS_COUNT = 10;
const resetElement = document.querySelector('.ad-form__reset');

const clearForm = () => {
  resetForm();
  resetAddress();
  resetSlider();
};

resetElement.addEventListener('click', () => {
  clearForm();
});

const onSuccessValidation = () => {
  blockSubmitButton();
  sendData(getFormData())
    .then(() => {
      clearForm();
      showSuccess();
    })
    .catch(() => {
      showError();
    })
    .finally(() => {
      unblockSubmitButton();
    });
};

initValidation(onSuccessValidation);
initSlider();

hideFilters();
hideForm();

const map = initMap(() => {
  showFilters();
  showForm();
});

getOffers()
  .then((offers) => {
    createMarkers(map, offers.slice(0, OFFERS_COUNT));
  })
  .catch(() => {
    showAlert('Не удалось загрузить данные:( Попробуйте еще!');
    hideFilters();
  });
