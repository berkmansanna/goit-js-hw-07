import { galleryItems } from './gallery-items.js';
// Change code below this line

const conteinerImgEl = document.querySelector(`.gallery`);

conteinerImgEl.addEventListener(`click`, onPictureClick);

const galleryMarkUp = createGalleryMarkUp(galleryItems);

function createGalleryMarkUp(items) {
  return items
    .map(
      item =>
        `<div class="gallery__item">
  <a class="gallery__link" href="${item.original}">
    <img
      class="gallery__image"
      src="${item.preview}"
      data-source="${item.original}"
      alt="${item.description}"
    />
  </a>
</div>`,
    )
    .join('');
}

conteinerImgEl.insertAdjacentHTML('beforeend', galleryMarkUp);

function onPictureClick(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  e.preventDefault();
  showModal(e.target.dataset.source);
}

let instance;
function showModal(src) {
  instance = basicLightbox.create(`
    <div class="modal">
        <img src="${src}"></img>
    </div>
`);
  instance.show();
  onModalOpen();
}

function onModalOpen() {
  window.addEventListener('keydown', onEscPress);
}

function onEscPress(event) {
  if (event.code === 'Escape') {
    instance.close();
    onModalClose();
  }
}

function onModalClose() {
  window.removeEventListener('keydown', onEscPress);
}
