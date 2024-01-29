const TITLE = [
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

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT = [
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

const DESCRIPTION = [
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


function padStart(rawString, size, template) {
  return rawString.toString().padStart(size, template);
}

function getRandomNumber(min, max, count = 0) {
  // const rand = Math.abs(min) + Math.random() * (Math.abs(max) + 1 - Math.abs(min));
  const rand = Math.abs(min) + Math.random() * (Math.abs(max) - Math.abs(min));
  return Number(rand.toFixed(count));
}


function createRandomIdFromRangeGenerator (min, max, count = 0) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomNumber(min, max, count);
    // Так как будет использоваться только для координат, можно забить на уникальность
    if (!count && previousValues.length >= (max - min + 1)) {
      // console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
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
  const IDStr = padStart(ID(), 2, 0);

  return IDStr;
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

function createURL() {
  const url = `img/avatars/user + ${generateUrlId()} + .png`;
  return url;
}

// Почему нельзя писать функцию с 1 строкой в которой return
const createRoom = () => {
  const room = {
    autor: {
      avatar: createURL(),
    },
    offer: {
      title: getRandomArrayElement(TITLE),
      address: `${generateLat()} + , + ${generateLng()}`,
      getPrice: getRandomNumber(3500, 10000),
      type: getRandomArrayElement(TYPE),
      getRooms: getRandomNumber(1, 5),
      guests: getRandomNumber(0, 5),
      checkin: getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECKOUT),
      features: generateRandomArray(FEATURES),
      description: getRandomArrayElement(DESCRIPTION),
      photos: generateRandomArray(PHOTOS)
    },
    location: {
      lat: generateLat(),
      lng: generateLng(),
    }
  };

  return room;
};

createRoom();

const similarRooms = Array.from({length: 10}, createRoom);
similarRooms();
