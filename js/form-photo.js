const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooserElement = document.querySelector('.ad-form__input');
const previewElement = document.querySelector('.ad-form__photo');

fileChooserElement.addEventListener('change', () => {
  const previewImage = document.createElement('img');
  previewElement.append(previewImage);
  const file = fileChooserElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewImage.src = URL.createObjectURL(file);
  }
});
