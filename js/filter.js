import { debounce } from './utils.js';

const filterElement = document.querySelector('.map__filters');

const priceRange = {
  min: 10000,
  max: 50000
};

const resetFilters = () => {
  filterElement.reset();
};

const checkType = (offerItem, filterData) => {
  const housingType = filterData.get('housing-type');
  return !(housingType !== 'any' && offerItem.offer.type !== housingType);
};

const checkRooms = (offerItem, filterData) => {
  const housingRooms = filterData.get('housing-rooms');
  if (housingRooms !== 'any') {
    return offerItem.offer.rooms === Number(housingRooms);
  }
  return true;
};

const checkPrice = (offerItem, filterData) => {
  const housingPrice = filterData.get('housing-price');

  if ((offerItem.offer.price < priceRange.min || offerItem.offer.price > priceRange.max) && housingPrice === 'middle') {
    return false;
  }
  if (offerItem.offer.price > priceRange.min && housingPrice === 'low') {
    return false;
  }
  return !(offerItem.offer.price < priceRange.max && housingPrice === 'high');
};

const checkGuests = (offerItem, filterData) => {
  const housingGuests = filterData.get('housing-guests');

  if (housingGuests !== 'any') {
    return offerItem.offer.guests === Number(housingGuests);
  }
  return true;
};

const checkFeatures = (offerItem, checkedFeatures) => {
  if (!offerItem.offer.features && checkedFeatures.length > 0) {
    return false;
  }
  for (const feature of checkedFeatures) {
    if (!offerItem.offer.features.includes(feature)) {
      return false;
    }
  }

  return true;
};

const filterOffers = (offers, filterData) => {
  const checkedFeatuesElements =
  document.querySelectorAll('input[name="features"]:checked');
  const checkedFeatues = Array.from(checkedFeatuesElements).map((item) => item.value);

  return offers.filter((offerItem) => {
    if (!checkType(offerItem,filterData)) {
      return false;
    }
    if (!checkPrice(offerItem, filterData)) {
      return false;
    }
    if (!checkRooms(offerItem, filterData)) {
      return false;
    }
    if (!checkGuests(offerItem, filterData)) {
      return false;
    }
    return checkFeatures(offerItem, checkedFeatues);
  });
};

const initFilter = (offers, callback) => {
  const onFilterChange = () => {
    const filterData = new FormData(filterElement);
    callback(filterOffers(offers, filterData));
  };

  filterElement.addEventListener('change', debounce(onFilterChange));
};

export { initFilter, resetFilters };
