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
// СЛУХАЧ ФОРМИ по інпуту
form.addEventListener('input', throttle(inputWork, 1000));
// СЛУХАЧ ФОРМИ по сабміту
form.addEventListener('submit', submitWork);
// ОБ'ЄКТ ДЛЯ ЗБЕРІГАННЯ
const feedbackObj =
  JSON.parse(localStorage.getItem('feedback-form-state')) ?? {};
// виклик функції перевірки СХОВИЩА
getFromStor();
// ОБРОБНИК ІНПУТА
function inputWork(event) {
  // зберігаю данні з інпутів
  feedbackObj[event.target.name] = event.target.value;
  // НАПОВНЮЮ СХОВИЩЕ ОБ'ЄКТОМ
  localStorage.setItem('feedback-form-state', JSON.stringify(feedbackObj));
}
// ОБРОБНИК Форми по сабміту
function submitWork(event) {
  // забороняю поведінку за замовчуванням
  event.preventDefault();
  // забороняю відправку з пустими полями
  if (formInput.value === '' || formTextArea.value === '') {
    alert('Заповніть всі поля');
    return;
  }
  // ОЧИШУЮ ПОЛЯ ФОРМИ;
  event.target.reset();
  // очищую СХОВИЩЕ
  localStorage.removeItem('feedback-form-state');
  // ВИВОДЖУ ОБ'ЄКТ В КОНСОЛЬ
  console.log(feedbackObj);
  // видаляю ключі  об'єкта зберігання після сабміту ще та клюка :((((
  delete feedbackObj.email;
  delete feedbackObj.message;
}
// ПЕРЕВІРКА ДАННИХ СХОВИЩА
function getFromStor() {
  //  якщо є данні для всіх полів
  if (localStorage.length != 0 && feedbackObj.message && feedbackObj.email) {
    //  оновлення  ТЕКСТ АРЕА
    formTextArea.value = feedbackObj.message;
    //  оновлення  ТЕКСТ  ІМЕЙЛА
    formInput.value = feedbackObj.email;
  }
  //   якщо відсутний відгук
  if (localStorage.length != 0 && !feedbackObj.message && feedbackObj.email) {
    //  оновлення  ТЕКСТ АРЕА
    formTextArea.value = '';
    //  оновлення  ІМЕЙЛА
    formInput.value = feedbackObj.email;
  }
  //   якщо відсутній имейл
  if (localStorage.length != 0 && feedbackObj.message && !feedbackObj.email) {
    //  оновлення  АРЕА
    formTextArea.value = feedbackObj.message;
    //  оновлення ІМЕЙЛА
    formInput.value = '';
  }
}
