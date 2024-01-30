const TITLES = [
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

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTIONS = [
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

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

function getRandomNumber(min, max, count = 0) {
  const rand = Math.abs(min) + Math.random() * (Math.abs(max) - Math.abs(min));
  return Number(rand.toFixed(count));
}


function createRandomIdFromRangeGenerator (min, max, count = 0) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomNumber(min, max, count);
    if (!count && previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(min, max, count);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

function generateUrlId() {
  const ID = createRandomIdFromRangeGenerator(1, 10);
  return ID().toString().padStart(2, 0);
}

const generateLat = createRandomIdFromRangeGenerator(35.65, 35.7, 5);
const generateLng = createRandomIdFromRangeGenerator(139.70000, 139.80000, 5);

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

function generateRandomArray (someArr) {
  const arrCount = getRandomNumber(1, someArr.length - 1);
  const randomArr = [];
  const generateArr = createRandomIdFromRangeGenerator(0, (someArr.length - 1));

  for (let i = 0; i < arrCount; i++) {
    randomArr.push(someArr[generateArr()]);
  }

  return randomArr;
}

const createRoom = () => ({
  autor: {
    avatar: `img/avatars/user-${generateUrlId()}.png`,
  },
  offer: {
    title: getRandomArrayElement(TITLES),
    address: `${generateLat()}, ${generateLng()}`,
    getPrice: getRandomNumber(3500, 10000),
    type: getRandomArrayElement(TYPES),
    getRooms: getRandomNumber(1, 5),
    guests: getRandomNumber(0, 5),
    checkin: getRandomArrayElement(CHECKIN_TIMES),
    checkout: getRandomArrayElement(CHECKIN_TIMES),
    features: generateRandomArray(FEATURES),
    description: getRandomArrayElement(DESCRIPTIONS),
    photos: generateRandomArray(PHOTOS)
  },
  location: {
    lat: generateLat(),
    lng: generateLng(),
  }
});

const createRooms = (length) => Array.from({ length }, createRoom);

createRooms();
