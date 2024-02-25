const mapFilters = document.querySelector('.map__filters');
const filters = mapFilters.querySelectorAll('select, input');

const addForm = document.querySelector('.ad-form');
const fields = addForm.querySelectorAll('input, textarea, select, button');
const sendButton = addForm.querySelector('.ad-form__submit');

const showFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  filters.forEach((filter) => {
    filter.disabled = false;
  });
  const popups = document.querySelectorAll('.popup');
  popups.forEach((popup) => {
    popup.classList.remove('hidden');
  });
};

const hideFilters = () => {
  mapFilters.classList.add('map__filters--disabled');
  filters.forEach((filter) => {
    filter.disabled = true;
  });
  const popups = document.querySelectorAll('.popup');
  popups.forEach((popup) => {
    popup.classList.add('hidden');
  });
};


const showForm = () => {
  addForm.classList.remove('ad-form--disabled');
  sendButton.disabled = false;
  fields.forEach((field) => {
    field.disabled = false;
  });
};

const hideForm = () => {
  addForm.classList.add('ad-form--disabled');
  sendButton.disabled = true;
  fields.forEach((field) => {
    field.disabled = true;
  });
};

export {showFilters, hideFilters, showForm, hideForm};
