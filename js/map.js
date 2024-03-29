import { createOfferPopupElement } from './tooltip.js';

const addressElement = document.querySelector('#address');

const ZOOM_LEVEL = 11;

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 50],
});

const icon = L.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const centerCoordinates = {
  lat: 35.681729,
  lng: 139.753927,
};

const mainPinMarker = L.marker(
  centerCoordinates,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const initMap = (onLoad) => {
  addressElement.value = `${centerCoordinates.lat}, ${centerCoordinates.lng}`;

  const map = L.map('map-canvas')
    .on('load', onLoad)
    .setView(centerCoordinates, ZOOM_LEVEL);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainPinMarker.addTo(map);
  mainPinMarker.on('moveend', (evt) => {
    const location = evt.target.getLatLng();
    addressElement.value = `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`;
  });

  const markerGroup = L
    .layerGroup()
    .addTo(map);

  return markerGroup;
};

const createMarker = (offer, markerGroup) => {
  const marker = L
    .marker(
      offer.location,
      {
        icon,
      },
    );

  marker
    .addTo(markerGroup)
    .bindPopup(createOfferPopupElement(offer));
};

const createMarkers = (markerGroup, offers) => {
  markerGroup.clearLayers();

  offers.forEach((offer) => {
    createMarker(offer, markerGroup);
  });
};

const resetAddress = () => {
  mainPinMarker.setLatLng(centerCoordinates);
  addressElement.value = `${centerCoordinates.lat}, ${centerCoordinates.lng}`;
};

export {createMarkers, initMap, resetAddress};
