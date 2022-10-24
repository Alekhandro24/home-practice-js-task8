// Виконуй це завдання у файлах 01-gallery.html і 01-gallery.js. Розбий його на декілька підзавдань:

// Додай бібліотеку SimpleLightbox як залежність проекту, використовуючи npm (посилання на CDN з твоєї минулої роботи більше не потрібне).
// Використовуй свій JavaScript код з попередньої домашньої роботи, але виконай рефакторинг з урахуванням того, що бібліотека була встановлена через npm (синтаксис import/export).
// Для того щоб підключити CSS код бібліотеки в проект, необхідно додати ще один імпорт, крім того, що описаний в документації.

// npm install simplelightbox

// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

// // ----- version 1 -----
// const refs = {
//   gallery: document.querySelector('.gallery'),
// };

// refs.gallery.innerHTML = galleryItems.map(createGalleryItemMarkup).join('');

// const lightbox = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
// });

// function createGalleryItemMarkup({ preview, original, description }) {
//   return `<a class="gallery__item" href="${original}">
//       <img class="gallery__image" src="${preview}" alt="${description}" />
//     </a>`;
// }

// // ----- version 2 -----
// const gallery = document.querySelector('.gallery');
// const items = [];

// galleryItems.forEach(elements => {
//   const galleryLink = document.createElement('a');
//   galleryLink.className = 'gallery__link';
//   galleryLink.href = element.original;

//   const galleryImage = document.createElement('img');
//   galleryImage.className = 'gallery__image';
//   galleryImage.src = element.preview;
//   galleryImage.setAttribute('title', element.description);
//   galleryImage.alt = element.description;

//   galleryLink.append(galleryImage);
//   items.push(galleryLink);
// });

// gallery.append(...items);

// new SimpleLightbox('.gallery a', {
//   captionDelay: 250,
// });

// // ----- version 3 -----

// const container = document.querySelector('.gallery');
// const pictureMap = createGalleryMap(galleryItems)

// container.insertAdjacentHTML('beforeend', pictureMap);

// function createGalleryItemMarkup(gallery) {
//     return gallery.map(({ preview, original, description }) => {
//         return `<a class="gallery__item" href="${original}">
//   <img loading="lazy" class="gallery__image lazyload" data-src="${original}" alt="${description}" />
// </a>`;
//     }).join('');
// }

// if ('loading' in HTMLImageElement.prototype) {
//     onLazySizesLoad();
// } else {
//   // Dynamically import the LazySizes library
//   onLazySizesLibraryAdd();
// }

// function onLazySizesLoad() {
//     const lazyImg = document.querySelectorAll('img[loading="lazy"]');
//     lazyImg.forEach(img => {
//         img.src = img.dataset.src;
//     });
// }

// function onLazySizesLibraryAdd() {
//   const script = document.createElement('script');
//   script.src =
//     'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
//   script.integrity =
//     'sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==';
//   script.crossOrigin = 'anonymous';
//   script.referrerpolicy = 'no-referrer';
//   document.body.appendChild(script);
// }

// var lightbox = new SimpleLightbox('.gallery a', {
//   /* options */
//   captionsData: 'alt',
//   captionDelay: 250,
// });

// ----- version 4 -----
const getGalleryRefs = document.querySelector('.gallery');
const listGalleryMarkup = galleryItems
  .map(
    ({ preview, original, description }) =>
      /*html*/ ` <a class='gallery__item' href='${original}' ><img class='gallery__image' src='${preview}' alt='${description}' title="${description}"> </a> `
  )
  .join('');

getGalleryRefs.innerHTML = listGalleryMarkup;

new SimpleLightbox('.gallery a ', {
  captionDelay: 250,
});
