// HTML містить розмітку форми. Напиши скрипт, який буде
// зберігати значення полів у локальне сховище, коли користувач щось друкує.
// Виконуй це завдання у файлах 03-feedback.html і 03-feedback.js. Розбий його на декілька підзавдань:

// Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і
//  message, у яких зберігай поточні значення полів форми. Нехай ключем для сховища буде рядок "feedback-form-state".
// Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми. В іншому випадку поля повинні бути порожніми.
// Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
// Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту і використовуй бібліотеку lodash.throttle.

import throttle from 'lodash.throttle';

//  посилання на форму
const form = document.querySelector('.feedback-form');
//  посилання на поле відгука
const formTextArea = document.querySelector('.feedback-form textarea');
//  посилання на ІНПУТ ИМЕЙЛА
const formInput = document.querySelector('.feedback-form input');
// СЛУХАЧ ФОРМИ
form.addEventListener('submit', submitWork);
// СЛУХАЧ ТЕКСТ АРЕА
formTextArea.addEventListener('input', throttle(inputWork, 500));
// СЛУХАЧ ІНПУТА ПОШТИ
formInput.addEventListener('input', throttle(inputWork, 500));
// ОБ'ЄКТ ДЛЯ ЗБЕРІГАННЯ
const feedbackObj = {};
// виклик функції перевірки СХОВИЩА
getFromStor();

// ОБРОБНИК Форми
function submitWork(event) {
  // забороняю поведінку за замовчуванням
  event.preventDefault();
  // консолю обєкт
  console.log(feedbackObj);
  // ОЧИШУЮ ФОРМу;
  event.target.reset();
  // очищую СХОВИЩЕ
  localStorage.removeItem('feedback-form-state');
}

// ОБРОБНИК ІНПУТА
function inputWork(event) {
  // зберігаю данні введнеі в текстове поле
  feedbackObj[event.target.name] = event.target.value;
  // НАПОВНЮЮ СХОВИЩЕ ОБ'ЄКТОМ
  localStorage.setItem('feedback-form-state', JSON.stringify(feedbackObj));
}
// ПЕРЕВІРКА ДАННИХ СХОВИЩА
function getFromStor() {
  const savedInlocalSt = localStorage.getItem('feedback-form-state');
  //   виводимо з стрінги
  const savedInlocalStParse = JSON.parse(savedInlocalSt) ?? '';

  if (savedInlocalStParse) {
    //  оновлення В Dom  ТЕКСТ АРЕА
    formTextArea.value = savedInlocalStParse.message;
    //  оновлення В Dom  ТЕКСТ ІНПУТА ІМЕЙЛА
    formInput.value = savedInlocalStParse.email;
  }
}
