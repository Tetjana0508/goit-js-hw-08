// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);
// Описан в документации
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";


const galleryContainer = document.querySelector('.gallery');
const cardsMarkup = createGalleryCardsMarkup(galleryItems); /* хранит результат вызова функции создания всей разметки */
galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup); /* распарсит все элементы в конце */

function createGalleryCardsMarkup(galleryItems) { /*создаем динамическкю разметку, рендерим всю разметку галереи */
  const markup = galleryItems.map(({ preview, original, description }) => { /* мепаем массив, возвращаем карточку для каждого объекта, и деструктуризируем свойства (preview, original, description), свойства на объекте есть, приходят в колбек мэпа и деструктуризируем */
    return `
  <li class='gallery__item'>
    <a class='gallery__link' href='${original}'>
      <img class='gallery__image'
      src='${preview}' 
      alt='${description}' 
      />
    </a>
</li>
  `
  }).join(''); /* массив елементов, который сшивает в одну строку */

  return markup; /* возвращаем массив строк/карточек */
}

  const imgParameter = new SimpleLightbox('.gallery a', { /* добавление опций с помощью галереи simplelightbox */
    captionSelector: 'img',
    captionsData: 'alt',
    captionDelay: 250,
    scrollZoom: false,
  });
