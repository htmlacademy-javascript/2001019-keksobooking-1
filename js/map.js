import { showFilters, showForm, hideFilters, hideForm } from './form.js';
import { createOffers } from './data.js';
import { createOfferPopupElement } from './tooltip.js';

const addressElement = document.querySelector('#address');
const coordinates = {
  lat: 35.681729,
  lng: 139.753927,
};
addressElement.value = `${coordinates.lat}, ${coordinates.lng}`;
const icon = L.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

hideFilters();
hideForm();

const initMap = () => {
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
    addressElement.value = latLng.join(', ');
  });

  return map;
};

const createMarker = (point, map) => {
  const lat = point.location.latitude;
  const lng = point.location.longitude;
  const markerGroup = L.layerGroup().addTo(map);

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

const createMarkers = (map) => {
  const points = createOffers(10);
  points.forEach((point) => {
    createMarker(point, map);
  });
};

export {createMarkers, initMap};
