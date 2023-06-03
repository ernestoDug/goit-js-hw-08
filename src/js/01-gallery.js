// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";



console.log(galleryItems);

// Додай бібліотеку SimpleLightbox як залежність проекту, використовуючи npm (посилання на CDN з твоєї минулої роботи більше не потрібне).
// Використовуй свій JavaScript код з попередньої домашньої роботи, але виконай рефакторинг з урахуванням того, що бібліотека 
// була встановлена через npm (синтаксис import/export).
// Для того щоб підключити CSS код бібліотеки в проект, необхідно додати ще один імпорт, крім того, що описаний в документації.


// * посилання на галерею
const galeryUl = document.querySelector(".gallery");

// * ствоерння розмітки
const galleryLi = galleryItems
  .map(
    (galleryItem) =>
      `<li class = "gallery__item"> <a class="gallery__link" href="${galleryItem.original}"> 
    <img class="gallery__image" src="${galleryItem.preview}" alt="${galleryItem.description}"> </a > </li>`
  )
  .join("");

// * рендер розмітки

galeryUl.insertAdjacentHTML("afterbegin", galleryLi);

// * використовую шаблон з бібліотеки

  new SimpleLightbox(".gallery a", {
      navText: ["-", "+"],
      captionsData: "alt",
      captionPosition: "",
      captionDelay: 250,
      closeText: "x",
      animationSpeed: 300,
      download: "true",
    });

