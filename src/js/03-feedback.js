import throttle from "lodash.throttle";
// 1. Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message, в которых сохраняй текущие значения полей формы. Пусть ключом для хранилища будет строка "feedback-form-state".
// 2. При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы. В противном случае поля должны быть пустыми.
// 3. При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, message и текущими их значениями в консоль.
// 4. Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд. Для этого добавь в проект и используй библиотеку lodash.throttle.
const STORAGE_KEY = 'feedback-form-state';
const selectedFilters = {};

const filterForm = document.querySelector('.feedback-form');

filterForm.addEventListener('submit', onFormSubmit);

filterForm.addEventListener('input', throttle(onTextareaInput, 500));

function onTextareaInput() { /* Функция onTextareaInput вызывается при вводе текста в поле и сохраняет значение в localStorage. */
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
};
