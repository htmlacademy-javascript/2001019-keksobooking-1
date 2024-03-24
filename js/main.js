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
import { initFilter, resetFilters } from './filter.js';

hideFilters();
hideForm();

const OFFERS_COUNT = 10;
const markerGroup = initMap(() => {
  showFilters();
  showForm();
});

initSlider();
initForm(() => {
  resetForm();
  resetAddress();
  resetSlider();
});

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
      resetFilters();
      markerGroup._map.closePopup();
    });
};

initValidation(onSuccessValidation);

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
