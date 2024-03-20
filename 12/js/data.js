import {getRandomNumber, getRandomArrayElement, shuffleArray} from './utils.js';

const titles = [
  'Olympus Hotel By Umbrella',
  'Apart Hotel Console',
  'Hotel Sky Station',
  'Friendly Hotel',
  'Ivy Hotel',
  'Capitol Hotel',
  'Hotel Solo',
  'Siberia Hotel',
  'Silver 37,',
  'Vintage Hotel',
];

const types = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const typesNames = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель'
};

const checkinTimes = [
  '12:00',
  '13:00',
  '14:00',
];

const features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const descriptions = [
  'Апарт-отель VovaDoma с террасой и бесплатным Wi-Fi расположен в центре Тбилиси...',
  'Мягкие комнаты с наивысшей оценкой гостей города!',
  'Лучшее кофе в нашем лобби-баре!',
  'Уютная комната со свежим ремонтом и собственой ванной',
  'Единственный в городе отель-пещера!',
  'Скромный, но чистый уголок для непритязательных туристов',
  'Спокойный и чистый отель для деловых людей в самом центре города)',
  'Лучший отель для пушистых питомцев и их хозяев',
  'Динамичный отель на улице с лучшими барами и ночными клубами',
  'Нас выбираю все транзитные путешественники. Находимся рядом с автобусным и ЖД вокзалом!',
];

const photos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const createOffer = (_, index) => {
  const latitude = getRandomNumber(35.65, 35.7, 5);
  const longitude = getRandomNumber(139.70000, 139.80000, 5);
  return {
    author: {
      avatar: `img/avatars/user${(index + 1).toString().padStart(2, 0)}.png`,
    },
    offer: {
      title: getRandomArrayElement(titles),
      address: `${latitude}, ${longitude}`,
      price: getRandomNumber(3500, 10000),
      type: getRandomArrayElement(types),
      roomCount: getRandomNumber(1, 5),
      guestCount: getRandomNumber(0, 5),
      checkin: getRandomArrayElement(checkinTimes),
      checkout: getRandomArrayElement(checkinTimes),
      features: shuffleArray(features),
      description: getRandomArrayElement(descriptions),
      photos: shuffleArray(photos)
    },
    location: {
      latitude,
      longitude
    }
  };
};

const createOffers = (offersCount) => Array.from({length: offersCount}, createOffer);

export {createOffers, typesNames};
