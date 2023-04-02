import throttle from "lodash.throttle";
// 1. Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message, в которых сохраняй текущие значения полей формы. Пусть ключом для хранилища будет строка "feedback-form-state".
// 2. При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы. В противном случае поля должны быть пустыми.
// 3. При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, message и текущими их значениями в консоль.
// 4. Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд. Для этого добавь в проект и используй библиотеку lodash.throttle.
const STORAGE_KEY = 'feedback-form-state';
const selectedFilters = {};

const filterForm = document.querySelector('.feedback-form');
// const textareaEl = document.querySelector('.feedback-form textarea')

// textareaMessage();
filterForm.addEventListener('submit', onFormSubmit);

filterForm.addEventListener('input', throttle(onTextareaInput, 500));

// filterForm.addEventListener('input', throttle(evt => {
//   selectedFilters[evt.target.name] = evt.target.value;
//   onTextareaInput();
// }, 500)
// );


function onTextareaInput() { /* Функция onTextareaInput вызывается при вводе текста в поле и сохраняет значение в localStorage. */
  // const message = evt.target.value;
  // console.log(message);
  // localStorage.setItem(STORAGE_KEY, message);
  // localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedFilters));

//   const email = filterForm.elements.email.value;
//   const message = filterForm.elements.message.value;
//   const currentState = { email, message };
// localStorage.setItem(STORAGE_KEY, JSON.stringify(currentState));

const currentState = JSON.stringify(selectedFilters);
localStorage.setItem(STORAGE_KEY, currentState);
};

function populateTextarea() { /* При загрузке страницы проверяем состояние хранилища и заполняем поля формы, если есть сохраненные данные */
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  if (savedMessage) {
    filterForm.elements.email.value = savedMessage || '';
    filterForm.elements.message.value = savedMessage || '';
  }
}
populateTextarea();

filterForm.addEventListener('input', e => {
  selectedFilters[e.target.name] = e.target.value;
  console.log(selectedFilters);
});
/* В конце кода, еще один слушатель события добавляется на форму, который слушает изменения значений в полях формы и сохраняет их в объект selectedFilters. */

function onFormSubmit(evt) { /* Функция onFormSubmit вызывается при отправке формы и отменяет ее действие по умолчанию, сбрасывает значения полей формы и удаляет данные из localStorage. */
  evt.preventDefault();
  console.log('Отправляем форму');
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);

  // const email = filterForm.elements.email.value;
  // const message = filterForm.elements.message.value;
  // const formData = new FormData(filterForm);
  // formData.forEach(email, message);
  //   console.log({ email, message });
  //   localStorage.removeItem(STORAGE_KEY);
  // filterForm.reset();
  
  //   const formData {
  //     elements: { email, message }
  //   } = evt.currentTarget;
  // console.log({ email: email.value, message: message.value });
  // };
  // evt.currentTarget.reset();
  // localStorage.removeItem(STORAGE_KEY);
  // // console.log(onFormSubmit);
  // formData();
};





// initForm();


// filterForm.addEventListener('input', evt => {
//   selectedFilters[evt.target.name] = evt.target.value;
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedFilters));
// });
/* Второй блок кода добавляет обработчик события ввода ('input') на форму с идентификатором 'filterForm'. Когда пользователь вводит данные в любое поле формы, значение поля сохраняется в объект selectedFilters с именем поля в качестве ключа. Затем метод localStorage.setItem() используется для сохранения selectedFilters в локальном хранилище браузера с помощью ключа STORAGE_KEY.
 */


// function initForm() {
//   let persistedFilters = localStorage.getItem(STORAGE_KEY);
//   if (persistedFilters) {
//     persistedFilters = JSON.parse(persistedFilters);
//     console.log(persistedFilters);
//     Object.entries(persistedFilters).forEach(([name, value]) => {
//       selectedFilters[name] = value;
//       filterForm.elements[name].value = value;
//     })
//   }
// }
/* Функция initForm() вызывается для проверки, сохранены ли выбранные пользователем фильтры в локальном хранилище браузера. Если они сохранены, persistedFilters распаковывается из строки JSON, сохраненной в локальном хранилище, и каждое значение добавляется в selectedFilters. Затем значения полей формы обновляются с помощью полученных сохраненных значений.
 */

// filterForm.addEventListener('submit', evt => {
//   evt.preventDefault();
//   const formData = new FormData(filterForm);
//   formData.forEach((value, name) => console.log(value, name));
// });
/* Первый блок кода добавляет обработчик события отправки формы ('submit') на форму с идентификатором 'filterForm'. Обработчик предотвращает отправку формы (с помощью метода evt.preventDefault()) и создает объект FormData из отправленных данных формы. Затем метод forEach() используется для перебора данных формы и вывода каждого значения в консоль.
 */
