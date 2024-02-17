const toggleFilter = (disable) => {
  const mapFilters = document.querySelector('.map__filters');
  const filters = mapFilters.querySelectorAll('select, input');
  const popups = document.querySelectorAll('.popup');

  if (disable) {
    filters.forEach((filter) => {
      filter.disabled = true;
      mapFilters.classList.add('map__filters--disabled');
    });
    popups.forEach((popup) => {
      popup.classList.add('hidden');
    });
  } else {

    filters.forEach((filter) => {
      filter.disabled = false;
      mapFilters.classList.remove('.map__filters--disabled');
    });
    popups.forEach((popup) => {
      popup.classList.remove('hidden');
    });
  }
};

const toggleForm = (disable) => {
  const addForm = document.querySelector('.ad-form');
  const fields = addForm.querySelectorAll('input, textarea, select');
  const sendButton = addForm.querySelector('.ad-form__submit');

  if (disable) {
    fields.forEach((field) => {
      field.disabled = true;
      addForm.classList.add('ad-form--disabled');
      sendButton.disabled = true;
    });
  } else {
    fields.forEach((field) => {
      field.disabled = false;
      addForm.classList.remove('ad-form--disabled');
      sendButton.disabled = false;
    });
  }
};

export {toggleFilter, toggleForm};
