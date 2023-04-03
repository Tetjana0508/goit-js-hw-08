import throttle from "lodash.throttle";
// 1. Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message, в которых сохраняй текущие значения полей формы. Пусть ключом для хранилища будет строка "feedback-form-state".
// 2. При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы. В противном случае поля должны быть пустыми.
// 3. При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, message и текущими их значениями в консоль.
// 4. Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд. Для этого добавь в проект и используй библиотеку lodash.throttle.
const STORAGE_KEY = 'feedback-form-state';
let selectedFilters = {};

const filterForm = document.querySelector('.feedback-form');
const textareaEl = document.querySelector('.feedback-form textarea')

filterForm.addEventListener('submit', onFormSubmit); /* повешали слушатель на кнопку */
textareaEl.addEventListener('input', throttle(onTextareaInput, 1000)); /* повешали слушатель на  */

populateTextarea();

function onFormSubmit(evt) { /* Отправка формы. Останавливаем поведение по умолчанию. Убираем сообщение из хранилища. Очищаем форму. */
  evt.preventDefault(); /* Запрет поведения по умолчанию, перезагрузку страницы */
  console.log('Отправляем форму');
  evt.currentTarget.reset(); /* reset() сбрасывает значение input (очищаем поля) в форме после отправки, evt.currentTarget - это форма, потому что onFormSubmit висит на filterForm.addEventListener */
  localStorage.removeItem(STORAGE_KEY); /* Очищение localStorage после отправки формы, передаем ключ */
};
// console.log(onFormSubmit);

function onTextareaInput(evt) { /* Получаем значение поля, сохраняем его в хранилище. Берем то что находится в value нашего input и записываем в localStorage */
  const value = evt.target.value; /* События всплывают и функция onTextareaInput выполняется отложено каждые 1000 мс, поэтому когда сработало события и вызвалась функция это разное время, поэтому в
  evt.currentTarget будет лежать много чего, и в консоле будет выдавать ошибки throttle, а evt.target никогда не меняется */
  console.log(value);
  localStorage.setItem(STORAGE_KEY, value); /* при каждом нажатии клавиши делаем setItem в этот ключ в это значение value */
//   selectedFilters[evt.target.name] = evt.target.value;
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedFilters));
};

function populateTextarea() { /* Получаем значение из хранилища. Если были данны обновляем ДОМ. Будет вызываться при загрузке страницы */
  const savedMessage = localStorage.getItem(STORAGE_KEY); /* Получаем значение из localStorage, не можем запихнуть в input в textarea, если локал уже что-то есть, то будет значение в консоли, а если первый раз ввошли то отобразит null, поэтому проверяем, а есть ли там что-то */
  if (savedMessage) { /* если в localStorage нету такого ключа то нам вернется null, поэтому проверяем есть там что-то есть - приводит к true, то тогда можем с ним работать там какие-то данные, в противном ничего не делаем */
    console.log(savedMessage);
    textareaEl.value = savedMessage; /* Обновляем ДОМ, берем textarea, записываем ей value */
  }
}


filterForm.addEventListener('input', e => { /* Делегирование. На форму вешаем прослушивание input */
  selectedFilters[e.target.name] = e.target.value; /* в объкт selectedFilters с ключем [e.target.name] ложим значение e.target.value - это реализация localStorage, но объект будем класть в localStorage */
  console.log(selectedFilters);
  // console.log(e.target.name); /* у каждого target будет name */
  // console.log(e.target.value); /* у каждого target будет value */
});







// initForm(); /* Инициализируем форму. */

// filterForm.addEventListener('submit', evt => { /* слушатель на submit */
//   evt.preventDefault(); /* чтоб не перезагружалось */
//   console.log(filterForm.elements); /* элементы формы */
//   const formData = new FormData(filterForm); /* ссылка на саму форму. FormData автоматически при сабмите собирает все значения полей в форме интерактивно, это не оюъект, а итерируемая сущность  */
//   console.log(formData)
//   formData.forEach((value, name) => console.log(value, name)); /* у FormData на прототипе есть forEach у которого FormDataEntryValue первым идет value(значение элемента фор), а вторым key(имя элемента фор) */
// });

// filterForm.addEventListener('change', evt => { /* Делегирование. Слушатель на общий контейнер,и внутри этого слушателя по evt.target прослушиваем события.У каждого селекта есть событие как change, вешаем на форму */
//   selectedFilters[evt.target.name] = evt.target.value; /* когда будем чендить, в объект пустой selectedFilters -> имя ключа [evt.target.name] и значением ставим evt.target.value. [evt.target.name] берем значение свойства name у evt.target как строку и обращаемся к свойству, єто динамическое значение ключей которого названий не знаем */
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedFilters)); /* При перезагрузке страницы сохранияем данные в локальном хранилище. Когда объект приводится из коробки к строке используем JSON.stringify чтоб привести к строке */
// });

// function initForm() { /* Инициализируем форму. Вытягиваем фильтры из localStorage */
//   let persistedFilters = localStorage.getItem(STORAGE_KEY); /* при выполнении функции initForm мы взяли фильтры, но они в виде строки {'size': 'xl'}, нфдо распарсить */
//   if (persistedFilters) { /* если данные есть в localStorage, а не null, то тогда начинаем с ними работать  */
//     persistedFilters = JSON.parse(persistedFilters); /* парсим данные и получаем объект с фильтрами и имена свойст  совпадают с именами селекторов (name)*/
//     console.log(persistedFilters);
//     Object.entries(persistedFilters).forEach(([name, value]) => { /* Проходимся по объектам ключей, берем Object.entries (так как у нас и имя и значение) и перебираем, каждая запись это массив из имя ключа и имя значения из forEach(entry) деструктуризируем в forEach(([name, value]) */
//       selectedFilters[name] = value; /* наполняем выбраные фильтры с сохраненных объекто в localStorage после перезагрузки страницы */
//       filterForm.elements[name].value = value; /* на фильтр filterForm.elements обращаемся к элементу с таким именем name и в его свойство value помещаем текущее значение фильтра */
//     })
//   }
// }