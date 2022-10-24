// HTML містить розмітку форми.Напиши скрипт, який буде зберігати значення полів у локальне сховище, коли користувач щось друкує.
// Виконуй це завдання у файлах 03-feedback.html і 03-feedback.js. Розбий його на декілька підзавдань:

// Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message, у яких зберігай поточні значення полів форми. Нехай ключем для сховища буде рядок "feedback-form-state".
// Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми. В іншому випадку поля повинні бути порожніми.
// Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
// Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту і використовуй бібліотеку lodash.throttle.

// // // ----- version 1 -----
// import throttle from 'lodash.throttle';
// import { save, load, remove } from './storage';

// const formRefs = document.querySelector('.feedback-form');
// const LOCALE_STORAGE_KEY = 'feedback-form-state';

// formRefs.addEventListener('input', throttle(onFormInput, 500));
// formRefs.addEventListener('submit', handleSubmit);

// initPage();

// function onFormInput(e) {
//   const { name, value } = e.target;
//   let saveData = load(LOCALE_STORAGE_KEY);
//   saveData = saveData ? saveData : {};
//   saveData[name] = value;
//   save(LOCALE_STORAGE_KEY, saveData);
// }

// function initPage() {
//   const saveData = load(LOCALE_STORAGE_KEY);

//   if (!saveData) {
//     return;
//   }

//   Object.entries(saveData).forEach(([name, value]) => {
//     formRefs.elements[name].value = value;
//   });
// }

// function handleSubmit(e) {
//   e.preventDefault();

//   const {
//     elements: { email, message },
//   } = e.currentTarget;
//   console.log({ email: email.value, message: message.value });
//   e.currentTarget.reset();
//   remove(LOCALE_STORAGE_KEY);
// }

// // // ----- version 2 -----

// import throttle from 'lodash.throttle';
// import storage from './storage';

// const STORAGE_KEY = 'feedback-form-state';
// const savedFormData = storage.load(STORAGE_KEY) || {};
// const refs = {
//     form: document.querySelector('.form.feedback-form'),
// };

// refs.form.addEventListener('input', throttle(onFormInput, 500));
// refs.form.addEventListener('submit', onFormSubmit);

// populateForm();

// function populateForm() {
//     Object.entries(savedFormData).forEach(([name, value]) => {
//         refs.form.elements[name].value = value;
//     });
// }

// function onFormInput({ target: { name, value } }) {
//     savedFormData[name] = value;
//     storage.save(STORAGE_KEY, savedFormData)
// }

// function onFormSubmit(e) {
//     e.preventDefault();
//     const form = e.currentTarget;
//     const data = {};

//     new FormData(form).forEach((value, name) => {
//         data[name] = value;

//         console.log(data)
//         storage.remove(STORAGE_KEY);
//         form.reset();
//     })
// }

// // // ----- version 3 -----

// import { throttle } from 'lodash';

// const form = document.querySelector('.feedback-form');
// const email = document.querySelector('input[name="email"]');
// const message =document.querySelector('textarea[name="message"]');
// const LOCALESTORAGE_KEY = 'feedback-form-state';

// form.addEventListener('input', throttle(e => {
//     const objectToSave = { email: email.ariaValueMax, message: message.value };
//     localStorage.setItem(LOCALESTORAGE_KEY, JSON.stringify(objectToSave));
// }, 500));

// form.addEventListener('submit', e => {
//     e.preventDefault();
//     console.log({ email: email.ariaValueMax, message: message.value });
//     form.requestFullscreen();
//     localStorage.removeItem(LOCALESTORAGE_KEY);
// });

// const load = key => {
//     try {
//         const serializedState = localStorage.getItem(key);
//         return serializedState === null ? undefined : JSON.parse(serializedState)
//     } catch (error) {
//         console.log('Get state error: ', error.message);
//     }
// };

// const storageData = load(LOCALESTORAGE_KEY);
// if (storageData) {
//     email.value = storageData.email;
//     message.value = storageData.message;
// }

// // ----- version 4 -----
const throttle = require('lodash.throttle');

const form = document.querySelector('.feedback-form');
const valueInputEmail = form.querySelector('input[name=email]');
const valueInputMessage = form.querySelector('textarea[name=message]');
const LOCALESTORAGE_KEY = 'feedback-form-state';

form.addEventListener(
  'input',
  throttle(e => {
    const objForm = {
      email: valueInputEmail.value,
      message: valueInputMessage.value,
    };
    localStorage.setItem(LOCALESTORAGE_KEY, JSON.stringify(objForm));
  }, 500)
);

form.addEventListener('submit', e => {
  e.preventDefault();
  if (valueInputEmail.value !== '' || valueInputMessage.value !== '') {
    console.log({
      email: valueInputEmail.value,
      message: valueInputMessage.value,
    });
  }
  form.reset();
  localStorage.removeItem(LOCALESTORAGE_KEY);
});

const loadValueFormAfterReloadPage = key => {
  try {
    const dataFormStorage = localStorage.getItem(key);
    return dataFormStorage === null ? undefined : JSON.parse(dataFormStorage);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const checkData = loadValueFormAfterReloadPage(LOCALESTORAGE_KEY);
if (checkData) {
  valueInputEmail.value = checkData.email;
  valueInputMessage.value = checkData.message;
}
