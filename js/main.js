import { createOffers } from './data.js';
import { initValidation } from './validation.js';
import { createMarkers, initMap } from './map.js';
import { initSlider } from './slider.js';
import { hideFilters, hideForm, showFilters, showForm } from './form.js';

const OFFERS_COUNT = 20;

initValidation();
initSlider();

hideFilters();
hideForm();

const map = initMap(() => {
  showFilters();
  showForm();
});

const offers = createOffers(OFFERS_COUNT);
createMarkers(map, offers);
