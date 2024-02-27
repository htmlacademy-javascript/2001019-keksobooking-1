import { createOffers } from './data.js';
import { renderOffers } from './popup.js';
import { hideFilters, hideForm } from './form.js';
import { initValidation } from './validation.js';

import './map.js';
import './slider.js';

const OFFERS_COUNT = 0;

const offers = createOffers(OFFERS_COUNT);

renderOffers(offers);
initValidation();
hideFilters();
hideForm();
