const sliderElement = document.querySelector('.ad-form__slider');
const priceElement = document.querySelector('#price');
const typeElement = document.querySelector('#type');

const MIN_PRICE = 0;
const MAX_PRICE = 100000;

const minPrices = {
  bungalow : 0,
  flat : 1000,
  hotel : 3000,
  house : 5000,
  palace : 10000,
};

const changeMinPriceByType = (typeInput) => {
  priceElement.value = 0;
  const minPrice = minPrices[typeInput.value];
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: minPrice,
      max: MAX_PRICE,
    },
  });
  sliderElement.noUiSlider.set(minPrice);
};

const initSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: MIN_PRICE,
      max: MAX_PRICE,
    },
    format: {
      from: (value) => parseInt(value, 10),
      to: (value) => parseInt(value, 10)
    },
    start: 0,
    step: 1,
    connect: 'lower',
  });
  sliderElement.noUiSlider.on('update', () => {
    priceElement.value = sliderElement.noUiSlider.get();
  });

  typeElement.addEventListener('change', (evt) => {
    changeMinPriceByType(evt.target);
  });

  changeMinPriceByType(typeElement);

  return sliderElement;
};

const resetSlider = () => {
  sliderElement.noUiSlider.reset();
};

export {initSlider, resetSlider};

