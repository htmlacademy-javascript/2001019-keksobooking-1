import { showFilters, showForm } from './form.js';
import { createOffers } from './data.js';
import { createOfferPopupElement } from './popup.js';
import { hideFilters, hideForm } from './form.js';

const addressField = document.querySelector('#address');
const coordinates = {
  lat: 35.681729,
  lng: 139.753927,
};
addressField.value = `${coordinates.lat},${coordinates.lng}`;
addressField.setAttribute('readonly', true);

hideFilters();
hideForm();

const map = L.map('map-canvas')
  .on('load', () => {
    showFilters();
    showForm();
  })
  .setView(coordinates, 11);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 50],
});

const mainPinMarker = L.marker(
  {
    lat: 35.681729,
    lng: 139.753927,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  let latLng = evt.target.getLatLng();
  latLng = Object.values(latLng);
  latLng = latLng.map((num) => num.toFixed(5));
  addressField.value = Object.values(latLng);
});

const icon = L.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const points = createOffers(10);
const markerGroup = L.layerGroup().addTo(map);

const createMarker = (point) => {
  const lat = point.location.latitude;
  const lng = point.location.longitude;

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(createOfferPopupElement(point));
};

points.forEach((point) => {
  createMarker(point);
});

