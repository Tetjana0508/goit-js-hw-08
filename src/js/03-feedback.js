import throttle from "lodash.throttle";
// 1. Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message, в которых сохраняй текущие значения полей формы. Пусть ключом для хранилища будет строка "feedback-form-state".
// 2. При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы. В противном случае поля должны быть пустыми.
// 3. При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, message и текущими их значениями в консоль.
// 4. Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд. Для этого добавь в проект и используй библиотеку lodash.throttle.
const STORAGE_KEY = 'feedback-form-state';
const selectedFilters = {};

const filterForm = document.querySelector('.feedback-form');
const textareaEl = document.querySelector('.feedback-form textarea')

filterForm.addEventListener('submit', onFormSubmit);
textareaEl.addEventListener('input', throttle(onTextareaInput, 500));

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log('Отправляем форму');
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
};
// console.log(onFormSubmit);

function onTextareaInput(evt) {
  const message = evt.target.value;
  console.log(message);
  localStorage.setItem(STORAGE_KEY, message);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedFilters));
};

function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  if (savedMessage) {
    console.log(savedMessage);
    textareaEl.value = savedMessage;
  }
}
populateTextarea();

filterForm.addEventListener('input', e => {
  selectedFilters[e.target.name] = e.target.value;
  console.log(selectedFilters);
});







// initForm();

// filterForm.addEventListener('submit', evt => {
//   evt.preventDefault();
//   const formData = new FormData(filterForm);
//   formData.forEach((value, name) => console.log(value, name));
// });

// filterForm.addEventListener('input', evt => {
//   selectedFilters[evt.target.name] = evt.target.value;
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedFilters));
// });

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