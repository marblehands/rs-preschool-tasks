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
const profileIcon = document.querySelector('.profile-link');
const profileMenu = document.querySelector('.profile-menu');

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

profileIcon.addEventListener('click',  () => {
  profileMenu.classList.toggle('profile-menu-visible');
});


// Увы это не сработало попробую еще раз :((((

// const radioButtons = document.querySelectorAll('.radio-btn');
// const books = document.querySelectorAll('.picks-wrapper');

// radioButtons.forEach((radioButton, index) => {

//   radioButton.addEventListener('click', () => {

//     // Прячу прыдущие книги
//   books.forEach((book) => {
//     book.addEventListener('animationend', () => {
//       book.classList.remove('active');
//     });
//   });

//     // Показываю книги в соответствии с выбранным радиобатоном
//     books[index].addEventListener('animationend', () =>{
//       books[index].classList.add('active');
//     });

//   });

// });

// Это скрипт который листает контент по клику на радиобаттоны с анимацией - это жесть но работает
const radioBtn = document.querySelectorAll('.radio-btn');
// console.log(radioBtn)
const radioData = [...document.querySelectorAll('div.picks-wrapper')].reduce((result, element) => {
  result.push( { id: element.id, display: element.classList.contains('picks-wrapper-active'), elem: element  } )
  return result
}, [])
// console.log(radioData)

radioBtn.forEach(radio => {
  radio.addEventListener('click', (e) => {

    let currentRadio = radioData.find(radio => radio.display);
  // console.log(currentRadio.elem);

  let selectedRadio = radioData.find(radio=> radio.id===e.target.dataset.radioId);
  // console.log(selectedRadio.elem);

  if (selectedRadio.id != currentRadio.id) {
    currentRadio.elem.addEventListener('transitionend', openSelectedRadio);
    currentRadio.elem.classList.remove('picks-wrapper-active');
    currentRadio.display = false;
  }

  function openSelectedRadio() {
    currentRadio.elem.removeEventListener('transitionend', openSelectedRadio);
    selectedRadio.elem.classList.add('picks-wrapper-active');
    selectedRadio.display = true;
  }

  })
})




