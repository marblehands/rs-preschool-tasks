console.log(`
1. Task: https://github.com/rolling-scopes-school/tasks/blob/master/tasks/library/library-part1.md
\n
2. Deploy: https://rolling-scopes-school.github.io/marblehands-JSFEPRESCHOOL2023Q2/library/
\n
3. Done 18.07.2023 / deadline 31.07.2023
\n
4. Score: 100 / 100
\n
Моя оценка после самопроверки: 100 баллов
\n
Привет, мой Ревьюер :) Если у тебя есть комментарии, любые советы или вопросы по моей работе, пожалуйста напиши мне RS дискорде: Ania @marblehands Спасибо за твою проверку <3
\n
Выполненные пункты:
1) Вёрстка валидная. +10
2) header, main, footer +2
3) Шесть элементов section (по количеству секций)  +2
4) Только один заголовок h1 +2
5) Пять (минимум) заголовков h2 +2
6) Один элемент nav (панель навигации в хедере) +2
7) Два (минимум) списка ul > li > a (панель навигации, ссылки на соцсети в футере) +2
8) Семь (минимум) кнопок button +2
9) Два (минимум) инпута input +2
10) Блок header +8
11) Секция Welcome +4
12) Секция About +6
13) Секция Favorites +8
14) Секция CoffeShop +6
15) Секция Contacts +6
16) Секция LibraryCard +8
17) Блок footer +8
18) Для построения сетки используются флексы (display: flex) +2
19) При уменьшении масштаба страницы браузера вся вёрстка (контент и фоны) размещается по центру, а не сдвигается в сторону. +2
20) Иконки добавлены в формате .svg. +2
21) Изображения добавлены в формате .jpg (.jpeg) или .png +2
22) Есть favicon +2
23) Плавная прокрутка по якорям +2
24) В футере название ссылки Username заменено и ведет на GitHub студента +
25) В футере ссылка The Rolling Scopes School ведет на страницу курса https://rs.school/js-stage0/  +2
26) Интерактивность элементов согласно макету. +2
27) Обязательное требование к интерактивности: плавное изменение внешнего вида элемента при наведении и клике не влияет на соседние элементы +2
`);

const burger = document.querySelector('[data-burger]');
const nav = document.querySelector('[data-nav]');

burger.addEventListener('click', () => {
  nav.classList.toggle('nav-visible');
  burger.classList.toggle('burger-visible');
})