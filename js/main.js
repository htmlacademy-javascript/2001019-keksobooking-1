import { createOffers } from './data.js';
import { renderOffers } from './tooltip.js';
import { initValidation } from './validation.js';
import { createMarkers, initMap } from './map.js';
import { initSlider } from './slider.js';

const OFFERS_COUNT = 0;
const offers = createOffers(OFFERS_COUNT);
const map = initMap();

renderOffers(offers);
initValidation();
createMarkers(map);
initSlider();
