console.log(`
1. Task: https://github.com/rolling-scopes-school/tasks/blob/master/tasks/library/library-part2.md
\n
2. Deploy: https://rolling-scopes-school.github.io/marblehands-JSFEPRESCHOOL2023Q2/library/
\n
3. Done 13.08.2023 / deadline 14.08.2023
\n
4. Score: 50 / 50
\n
Моя оценка после самопроверки: 50 баллов
\n
Привет, мой Ревьюер :) Если у тебя есть комментарии, любые советы или вопросы по моей работе, пожалуйста напиши мне RS дискорде: Ania @marblehands Спасибо за твою проверку <3
\n
Выполненные пункты:
1) Вёрстка соответствует макету. Ширина экрана 768px +26
2) Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12
3) На ширине экрана 768рх реализовано адаптивное меню +12
`);

const burger = document.querySelector('.burger-button');
const nav = document.querySelector('.nav');
const body = document.querySelector('.body');
const navLinks = document.querySelectorAll('.nav-link');

burger.addEventListener('click', () => {
  nav.classList.toggle('nav-visible');
  burger.classList.toggle('burger-visible');
});

navLinks.forEach (link => {
  link.addEventListener('click', function() {
  nav.classList.remove('nav-visible');
  burger.classList.remove('burger-visible');
  })
});

body.addEventListener('click', function(event) {
  if (event.target !== nav && event.target !== burger) {
  nav.classList.remove('nav-visible');
  burger.classList.remove('burger-visible');
  }
});



