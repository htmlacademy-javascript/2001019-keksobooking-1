const filterElement = document.querySelector('.map__filters');

const checkType = (offerItem, filterData) => {
  const housingType = filterData.get('housing-type');

  if (housingType !== 'any' && offerItem.offer.type !== housingType) {
    return false;
  }

  return true;
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

  if ((offerItem.offer.price < 10000 || offerItem.offer.price > 50000) && housingPrice === 'middle') {
    return false;
  }
  if (offerItem.offer.price > 10000 && housingPrice === 'low') {
    return false;
  }
  if (offerItem.offer.price < 50000 && housingPrice === 'high') {
    return false;
  }
  return true;
};

const checkGuests = (offerItem, filterData) => {
  const housingGuests = filterData.get('housing-guests');

  if (housingGuests !== 'any') {
    return offerItem.offer.guests === housingGuests;
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
  const checkedFeatuesElements = document.querySelectorAll('input[name="features"]:checked');
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
    if (!checkFeatures(offerItem, checkedFeatues)) {
      return false;
    }

    return true;
  });
};

const initFilter = (offers, callback) => {

  filterElement.addEventListener('change', () => {
    const filterData = new FormData(filterElement);
    callback(filterOffers(offers, filterData));
  });
};

export { initFilter };
