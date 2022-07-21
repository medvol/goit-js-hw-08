import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";

import { galleryItems } from './gallery-items.js';
// Change code below this line

const createItemMarkup = (items) => {
      
    return items.reduce((acc, item) => {
        const { preview, original, description } = item;

        return acc + `<a class="gallery__item" href="${original}">
                <img class="gallery__image" src="${preview}" alt="${description}" />
                </a>`

    }, '')
     
}

const containerImage = document.querySelector('.gallery')

const listImage = createItemMarkup(galleryItems);
const addImageMarkup = containerImage.insertAdjacentHTML('beforeend', listImage);

const lightbox = new SimpleLightbox('.gallery a', { 
    captionsData: 'alt',
    captionDelay: 250,
});