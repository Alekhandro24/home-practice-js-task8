// HTML містить < iframe > з відео для Vimeo плеєра.Напиши скрипт, який буде зберігати поточний час відтворення відео у локальне сховище і, після перезавантаження сторінки, продовжувати відтворювати відео з цього часу.
// Виконуй це завдання у файлах 02-video.html і 02-video.js. Розбий його на декілька підзавдань:

// Ознайомся з документацією бібліотеки Vimeo плеєра.
// Додай бібліотеку як залежність проекту через npm.
// Ініціалізуй плеєр у файлі скрипта як це описано в секції pre-existing player, але враховуй, що у тебе плеєр доданий як npm пакет, а не через CDN.
// Вивчи документацію методу on() і почни відстежувати подію timeupdate - оновлення часу відтворення.
// Зберігай час відтворення у локальне сховище. Нехай ключем для сховища буде рядок "videoplayer-current-time".
// Під час перезавантаження сторінки скористайся методом setCurrentTime() з метою відновлення відтворення зі збереженої позиції.
// Додай до проекту бібілотеку lodash.throttle і зроби так, щоб час відтворення оновлювався у сховищі не частіше, ніж раз на секунду.

// npm install @vimeo/player
// npm i lodash.throttle

// // // ----- version 1 -----
// import VimeoPlayer from '@vimeo/player';
// import lodashThrottle from 'lodash.throttle';

// const VIMEO_PLAYER_STORAGE_KEY = 'videoplayer-current-time';

// const iframe = document.querySelector('iframe');
// const player = new VimeoPlayer(iframe);

// player.on('timeupdate', lodashThrottle(onTimeUpdate, 1000));

// function onTimeUpdate(e) {
//   const playbackPosition = e.seconds;
//   localStorage.setItem(VIMEO_PLAYER_STORAGE_KEY, playbackPosition);
// }

// player.getVideoTitle().then(function (title) {
//   console.log('title:', title);
// });

// player
//   .setCurrentTime(localStorage.getItem(VIMEO_PLAYER_STORAGE_KEY))
//   .then(function (seconds) {
//     // seconds = the actual time that the player seeked to
//   })
//   .catch(function (error) {
//     switch (error.name) {
//       case 'RangeError':
//         // the time was less than 0 or greater than the video’s duration
//         break;
//       default:
//         // some other error occurred
//         break;
//     }
//   });

// // // ----- version 2 -----
// import Player from '@vimeo/player';
// import throttle from 'lodash.throttle';

// const CURRENT_TIME_KEY = 'videoplayer-current-time';

// const refs = {
//   player: document.querySelector('#vimeo-player'),
// };

// const player = new Player(refs.player);

// player.setCurrentTime(localStorage.getItem(CURRENT_TIME_KEY) || 0);
// player.on('timeupdate', throttle(onTimeUpdate, 1000));

// function onTimeUpdate({ seconds }) {
//   localStorage.setItem(CURRENT_TIME_KEY, seconds);
// }

// // // ----- version 3 -----

// import Player from '@vimeo/player';
// import { throttle } from 'lodash';

// const iframe = document.querySelector('iframe');
// const player = new Player(iframe);

// player.on('timeupdate', throttle(e => {
//     localStorage.setItem('videoplayer-current-time', e.seconds);
// }, 1000));

// player.setCurrentTime(localStorage.getItem('videoplayer-current-time')).catch(function (errror) {
//     console.log(error)
// })

// // ----- version 4 -----

import Player from '@vimeo/player';
const throttle = require('lodash.throttle');
const iframe = document.querySelector('iframe');

const player = new Player(iframe);

const Storage_KEY = 'videoplayer-current-time';
const time = localStorage.getItem(Storage_KEY);

if (time) {
  player.setCurrentTime(time);
}

player.on(
  'timeupdate',
  throttle(e => localStorage.setItem(Storage_KEY, e.seconds), 1000)
);
