const mapFiltersElement = document.querySelector('.map__filters');
const filterElements = mapFiltersElement.querySelectorAll('select, input');
const addFormElement = document.querySelector('.ad-form');
const fieldElements = addFormElement.querySelectorAll('input, textarea, select, button');
const sendButtonElement = addFormElement.querySelector('.ad-form__submit');
const resetElement = document.querySelector('.ad-form__reset');
const avatarFileChooserElement = document.querySelector('.ad-form-header__input');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const offerFileChooserElement = document.querySelector('.ad-form__input');
const offerPreviewElement = document.querySelector('.ad-form__photo');

const submitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const ALLOWED_FILE_TYPES = ['jpg', 'jpeg', 'png'];

const getFormData = () => new FormData(addFormElement);

const showFilters = () => {
  mapFiltersElement.classList.remove('map__filters--disabled');
  filterElements.forEach((filter) => {
    filter.disabled = false;
  });
  const popups = document.querySelectorAll('.popup');
  popups.forEach((popup) => {
    popup.classList.remove('hidden');
  });
};

const hideFilters = () => {
  mapFiltersElement.classList.add('map__filters--disabled');
  filterElements.forEach((filter) => {
    filter.disabled = true;
  });
  const popups = document.querySelectorAll('.popup');
  popups.forEach((popup) => {
    popup.classList.add('hidden');
  });
};

const showForm = () => {
  addFormElement.classList.remove('ad-form--disabled');
  sendButtonElement.disabled = false;
  fieldElements.forEach((field) => {
    field.disabled = false;
  });
};

const hideForm = () => {
  addFormElement.classList.add('ad-form--disabled');
  sendButtonElement.disabled = true;
  fieldElements.forEach((field) => {
    field.disabled = true;
  });
};

const blockSubmitButton = () => {
  sendButtonElement.disabled = true;
  sendButtonElement.textContent = submitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  sendButtonElement.disabled = false;
  sendButtonElement.textContent = submitButtonText.IDLE;
};

const resetForm = () => {
  addFormElement.reset();
};

const handleAvatarChange = () => {
  const file = avatarFileChooserElement.files[0];
  const fileName = file.name.toLowerCase();

  if (ALLOWED_FILE_TYPES.some((it) => fileName.endsWith(it))) {
    avatarPreviewElement.src = URL.createObjectURL(file);
  }
};

const handleOfferPhotoChange = () => {
  const file = offerFileChooserElement.files[0];
  const fileName = file.name.toLowerCase();

  if (ALLOWED_FILE_TYPES.some((it) => fileName.endsWith(it))) {
    const previewImageElement = document.createElement('img');
    previewImageElement.src = URL.createObjectURL(file);
    offerPreviewElement.append(previewImageElement);
  }
};

const initForm = (onReset) => {
  avatarFileChooserElement.addEventListener('change', handleAvatarChange);
  offerFileChooserElement.addEventListener('change', handleOfferPhotoChange);
  resetElement.addEventListener('click', onReset);
};


export {showFilters, hideFilters, showForm, hideForm, resetForm, initForm, getFormData, blockSubmitButton, unblockSubmitButton};
