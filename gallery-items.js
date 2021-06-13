export default [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];


// 4. Если хотите выполнить задание в части реализации пролистывания изображений, при создании разметки путем дополнения тега img data-атрибутом записывайте для каждого из изображений его индекс (разумеется, листание можно реализовать и путем навигации по DOM либо прохождением циклом по массиву всех изображений, но это куда менее оптимальный вариант).

// 5. Слушатели для закрытия модального окна по клавише ESC и листания изображений создавайте только при открытии модального окна (то есть внутри ответственной за это функции). Соответственно, удаляйте при закрытии (внутри функции, отвечающей за закрытие модалки) – память браузера скажет вам за это спасибо. (edited) 

import images from './gallery-items.js';

const refs = {
  imagesBox: document.querySelector('.js-gallery'),
  originalImage: document.querySelector('.gallery__link'),
  lightboxEl: document.querySelector('.lightbox'),
  lightboxImg: document.querySelector('.lightbox__image'),
  lightboxCloseBtn: document.querySelector('.lightbox__button'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
}

const imagesCardsMarkup = makeImageCard(images);
refs.imagesBox.insertAdjacentHTML('beforeend', imagesCardsMarkup);

function makeImageCard(images) {
  
  return images
    .map(({preview, original, description}) => {
      return `
      <li class='gallery__item'>
        <a class='gallery__link' href='${original}'>
          <img class='gallery__image' src='${preview}' data-source='${original}' alt=${description}/> 
        </a>
      </li>
      `;
    })
    .join('');
};



function onImageClick(event) {
  event.preventDefault();
  
  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onNavigationKeysPress);
  const isImageBoxEl = event.target.classList.contains('gallery__image');
  if (!isImageBoxEl) {
    return;
  }
  
  refs.lightboxEl.classList.add('is-open');

  const source = event.target.dataset.source;
  const altName = event.target.getAttribute('alt');
  refs.lightboxImg.setAttribute('src', source);
  refs.lightboxImg.setAttribute('alt', altName);
  let index = images.map(image => image.original).indexOf(source);
  return index;
  }

function forCloseModal(event) {
  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onNavigationKeysPress);
  refs.lightboxEl.classList.remove('is-open');
  refs.lightboxImg.setAttribute('src', '');
  refs.lightboxImg.setAttribute('alt', '');
}

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;
  if (isEscKey) {
    forCloseModal();
  }
}

function onNavigationKeysPress(event) {
  if (event.code === 'ArrowRight') {
  refs.lightboxImg.getAttribute('alt');
  }
  // if (event.code === 'ArrowLeft') {
  //   refs.lightboxImg.getAttribute('src', source-1);
  //   refs.lightboxImg.getAttribute('alt', altName-1);
  // }
}

refs.imagesBox.addEventListener('click', onImageClick);
refs.lightboxCloseBtn.addEventListener('click', forCloseModal);
refs.lightboxOverlay.addEventListener('click', forCloseModal);