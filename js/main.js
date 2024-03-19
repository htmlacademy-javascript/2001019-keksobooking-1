import { initValidation } from './validation.js';
import { createMarkers, initMap, resetAddress } from './map.js';
import { initSlider, resetSlider } from './slider.js';
import {
  hideFilters,
  hideForm,
  showFilters,
  showForm,
  initForm,
  getFormData,
  blockSubmitButton,
  unblockSubmitButton,
  resetForm,
} from './form.js';
import { showSuccess, showError } from './messages.js';
import { getOffers, sendData } from './api.js';
import { showAlert } from './utils.js';
import { initFilter } from './filter.js';

hideFilters();
hideForm();

const OFFERS_COUNT = 10;

const onSuccessValidation = () => {
  blockSubmitButton();
  sendData(getFormData())
    .then(() => {
      resetForm();
      resetAddress();
      resetSlider();
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
initForm(() => {
  resetForm();
  resetAddress();
  resetSlider();
});

const markerGroup = initMap(() => {
  showFilters();
  showForm();
});

const filtersCallback = (offers) => {
  createMarkers(markerGroup, offers.slice(0, OFFERS_COUNT));
};

getOffers()
  .then((offers) => {
    filtersCallback(offers);
    initFilter(offers, filtersCallback);
  })
  .catch(() => {
    showAlert('Не удалось загрузить данные:( Попробуйте еще!');
    hideFilters();
  });
