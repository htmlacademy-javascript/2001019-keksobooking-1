import {typesNames} from './data.js';

const mapCanvas = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const createOfferPopupElement = ({author, offer}) => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = typesNames[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.roomCount} комнаты для ${offer.guestCount} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const userOffers = offer.features;
  const featuresContainer = cardElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');

  featuresList.forEach((featuresListItem) => {
    const isAdded = userOffers.some(
      (userOffersItem) => featuresListItem.classList.contains(`popup__feature--${userOffersItem}`),
    );

    if (!isAdded) {
      featuresListItem.remove();
    }
  });

  cardElement.querySelector('.popup__description').textContent = offer.description;
  cardElement.querySelector('.popup__photos img').src = offer.photos;
  cardElement.querySelector('.popup__avatar').src = author.avatar;

  return cardElement;
};


const renderOffers = (offers) => {
  const offersListFragment = document.createDocumentFragment();
  offers.forEach((offerItem) => {
    const offerElement = createOfferPopupElement(offerItem);
    offersListFragment.appendChild(offerElement);
  });
  mapCanvas.appendChild(offersListFragment);
};

export {renderOffers, createOfferPopupElement};
