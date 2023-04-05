import throttle from "lodash.throttle";
// 1. Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message, в которых сохраняй текущие значения полей формы. Пусть ключом для хранилища будет строка "feedback-form-state".
// 2. При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы. В противном случае поля должны быть пустыми.
// 3. При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, message и текущими их значениями в консоль.
// 4. Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд. Для этого добавь в проект и используй библиотеку lodash.throttle.
// const STORAGE_KEY = 'feedback-form-state';
// let selectedFilters = {};

const STORAGE_KEY = 'feedback-form-state';
let selectedFilters = {};

const filterForm = document.querySelector('.feedback-form');
const textareaEl = document.querySelector('.feedback-form textarea')

filterForm.addEventListener('submit', onFormSubmit); /* повешали слушатель на кнопку */
filterForm.addEventListener('input', throttle(inputEl, 1000)); /* повешали слушатель на input */
// textareaEl.addEventListener('input', throttle(onTextareaInput, 1000)); 
// filterForm.removeEventListener('click', onFormSubmit);

populateTextarea();
/* +++++++++++++++++++++++ОТПРАВКА/ЧИСТКА ФОРМЫ+++++++++++++++++++ */
function onFormSubmit(evt) { /* Отправка формы. Останавливаем поведение по умолчанию. Убираем сообщение из хранилища. Очищаем форму. */
  evt.preventDefault(); /* Запрет поведения по умолчанию, перезагрузку страницы */
  selectedFilters = {};
  console.log('Отправляем форму');
  evt.currentTarget.reset(); /* reset() сбрасывает значение input (очищаем поля) в форме после отправки, evt.currentTarget - это форма, потому что onFormSubmit висит на filterForm.addEventListener */
  localStorage.removeItem(STORAGE_KEY); /* Очищение localStorage после отправки формы, передаем ключ */
  filterForm.removeEventListener('submit', onFormSubmit);
};
// console.log(onFormSubmit);
// function onSubmitPress(evt) {
//   console.log(filterForm.elements['name'].value);
//     if (filterForm.elements['name'].value === '') {
//       onFormSubmit();
//     }
//   }


/*--------------------СЛУШАТЕЛЬ СОБЫТИЙ---------------------------- */
// function onTextareaInput(evt) { /* Получаем значение поля, сохраняем его в хранилище. Берем то что находится в value нашего input и записываем в localStorage */
//   const value = evt.target.value; /* События всплывают и функция onTextareaInput выполняется отложено каждые 1000 мс, поэтому когда сработало события и вызвалась функция это разное время, поэтому в evt.currentTarget будет лежать много чего, и в консоле будет выдавать ошибки throttle, а evt.target никогда не меняется */
//   localStorage.setItem(STORAGE_KEY, value); /* при каждом нажатии клавиши делаем setItem в этот ключ в это значение value */
// //   selectedFilters[evt.target.name] = evt.target.value;
// //   localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedFilters));
//   console.log(value);
// };

/*++++++++++++++++++++++++++ДАННЫЕ ИЗ ЛОКАЛ.ХРАНИЛИЩА+++++++++++++++++++++++ */
function populateTextarea() { /* Получаем значение из хранилища. Если были данны обновляем ДОМ. Будет вызываться при загрузке страницы */
  let persistedFilters = localStorage.getItem(STORAGE_KEY); /* Получаем значение из localStorage, не можем запихнуть в input в textarea, если локал уже что-то есть, то будет значение в консоли, а если первый раз ввошли то отобразит null, поэтому проверяем, а есть ли там что-то */
  if (persistedFilters) { /* если в localStorage нету такого ключа то нам вернется null, поэтому проверяем есть там что-то есть - приводит к true, то тогда можем с ним работать там какие-то данные, в противном ничего не делаем */
    persistedFilters = JSON.parse(persistedFilters);
    console.log(persistedFilters);
    Object.entries(persistedFilters).forEach(([name, value]) => {
      selectedFilters[name] = value;
      filterForm.elements[name].value = value; /* Обновляем ДОМ, берем textarea, записываем ей value */
    })
  }
}

/*--------------------ДЕЛЕГИРОВАНИЕ ФОРМЫ_Слушатель на общий контейнер---------------------------- */
function inputEl (e) { /* Делегирование. На форму вешаем прослушивание input */
  selectedFilters[e.target.name] = e.target.value; /* в объкт selectedFilters с ключем [e.target.name] ложим значение e.target.value - это реализация localStorage, но объект будем класть в localStorage */
  localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedFilters));
  // console.log(selectedFilters);
};

