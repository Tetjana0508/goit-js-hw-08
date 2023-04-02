import Player from "@vimeo/player";
import throttle from "lodash.throttle";
/* Напиши скрипт который будет сохранять текущее время воспроизведения видео в локальное хранилище и, при перезагрузке страницы, продолжать воспроизводить видео с этого времени.
1. Ознакомься с документацией библиотеки Vimeo плеера.
2. Добавь библиотеку как зависимость проекта через npm.
3. Инициализируй плеер в файле скрипта как это описано в секции pre-existing player, но учти что у тебя плеер добавлен как npm пакет, а не через CDN.
4. Разбери документацию метода on() и начни отслеживать событие timeupdate - обновление времени воспроизведения.
5. Сохраняй время воспроизведения в локальное хранилище. Пусть ключом для хранилища будет строка "videoplayer-current-time".
6. При перезагрузке страницы воспользуйся методом setCurrentTime() для того чтобы возобновить воспроизведение с сохраненной позиции.
7. Добавь в проект библиотеку lodash.throttle и сделай так, чтобы время воспроизведения обновлялось в хранилище не чаще чем раз в секунду. */

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
/* Используем API проигрывателя Vimeo для обработки событий и действий, связанных с видеопроигрывателем, встроенным в документ HTML, через элемент iframe. Импортируюм Player класс из библиотеки Vimeo Player и создает новый экземпляр класса Player с iframe-элементом, выбранным в документе. */
const currentTime = 'videoplayer-current-time'; /* Переменная currentTime устанавливает ключ для сохранения текущего времени воспроизведения видео в объекте localStorage. */
player.on('timeupdate', throttle(function (time) { /* Player регистрирует обработчик событий timeupdate, который будет вызываться при изменении текущего времени воспроизведения видео. Функция throttle ограничивает вызов этого обработчика событий до одного раза в секунду. Внутри этого обработчика событий текущее время воспроизведения сохраняется в localStorage браузера в формате JSON */
  localStorage.setItem(currentTime, JSON.stringify(time));
}, 1000)
);
const saveTime = localStorage.getItem(currentTime);

const timeStop = JSON.parse(saveTime);


player.setCurrentTime(timeStop.seconds || 0); /* setCurrentTime устанавливает время воспроизведения видео, которое было сохранено в localStorage при предыдущем воспроизведении видео, если такое значение было сохранено, или на 0, если сохраненное время не существует. */