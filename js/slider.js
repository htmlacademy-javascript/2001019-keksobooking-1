const sliderElement = document.querySelector('.ad-form__slider');
const priceElement = document.querySelector('#price');
const typeElement = document.querySelector('#type');
const maxPrice = 100000;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: maxPrice,
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

const changeMinPriceByType = (typeInput) => {
  priceElement.value = 0;

  const minPrices = {
    bungalow : 0,
    flat : 1000,
    hotel : 3000,
    house : 5000,
    palace : 10000,
  };

  const minPrice = minPrices[typeInput.value];

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: minPrice,
      max: maxPrice,
    },
  });
  sliderElement.noUiSlider.set(minPrice);
};

typeElement.addEventListener('change', (evt) => {
  changeMinPriceByType(evt.target);
});

changeMinPriceByType(typeElement);

const initSlider = () => {
  changeMinPriceByType(typeElement);
};

export {initSlider};

