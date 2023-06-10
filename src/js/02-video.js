// HTML містить <iframe> з відео для Vimeo плеєра. Напиши скрипт, який буде зберігати поточний
// час відтворення відео у локальне сховище і,
//  після перезавантаження сторінки, продовжувати відтворювати відео з цього часу.

//  Ознайомся з документацією бібліотеки Vimeo плеєра.
//  Додай бібліотеку як залежність проекту через npm.
//  Ініціалізуй плеєр у файлі скрипта як це описано в секції pre-existing player, але враховуй,
// що у тебе плеєр доданий як npm пакет, а не через CDN.
//  Вивчи документацію методу on() і почни відстежувати подію timeupdate - оновлення часу відтворення.
//  Зберігай час відтворення у локальне сховище. Нехай ключем для сховища буде рядок "videoplayer-current-time".
//  Під час перезавантаження сторінки скористайся методом setCurrentTime() з метою відновлення відтворення зі збереженої позиції.
//  Додай до проекту бібліотеку lodash.throttle і зроби так, щоб час відтворення оновлювався у сховищі не частіше, ніж раз на секунду.

import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

// отримуємо посиланя на ифрейм
const iframe = document.querySelector('iframe');
// створюємо новий екземпляр
const player = new Player(iframe);
// слухаємо тротлимо та обробляємо
const timeUp = player.on('timeupdate', throttle(timeFunk, 1000));

// функція обробника
function timeFunk(event) {
  // console.log(event.seconds);
  // записуємо час в змінну
  const secundsPlay = event.seconds;
  // закидаємо до сховища
  const currentTime = localStorage.setItem(
    'videoplayer-current-time',
    secundsPlay
  );
}
// отримую з сховища
const favoriteAr = localStorage.getItem('videoplayer-current-time') ?? '';

// витягаю час методом бібліотеки для відтворення
if (favoriteAr) {
  player.setCurrentTime(favoriteAr);
}
