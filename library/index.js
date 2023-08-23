// console.log(`
// 1. Task: https://github.com/rolling-scopes-school/tasks/blob/master/tasks/library/library-part2.md
// \n
// 2. Deploy: https://rolling-scopes-school.github.io/marblehands-JSFEPRESCHOOL2023Q2/library/
// \n
// 3. Done 13.08.2023 / deadline 14.08.2023
// \n
// 4. Score: 50 / 50
// \n
// Моя оценка после самопроверки: 50 баллов
// \n
// Привет, мой Ревьюер :) Если у тебя есть комментарии, любые советы или вопросы по моей работе, пожалуйста напиши мне RS дискорде: Ania @marblehands Спасибо за твою проверку <3
// \n
// Выполненные пункты:
// 1) Вёрстка соответствует макету. Ширина экрана 768px +26
// 2) Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12
// 3) На ширине экрана 768рх реализовано адаптивное меню +12
// `);


// // Burger Menu

// const burger = document.querySelector('.burger-button');
// const nav = document.querySelector('.nav');
// const body = document.querySelector('.body');
// const navLinks = document.querySelectorAll('.nav-link');
// let burgerMenu = false;

// burger.addEventListener('click', () => {
//   burgerMenu = !burgerMenu;
//   nav.classList.toggle('nav-visible');
//   burger.classList.toggle('burger-visible');
// });

// navLinks.forEach (link => {
//   link.addEventListener('click', function() {
//   nav.classList.remove('nav-visible');
//   burger.classList.remove('burger-visible');
//   })
// });

// body.addEventListener('click', function(event) {
//   if (event.target !== nav && event.target !== burger) {
//   nav.classList.remove('nav-visible');
//   burger.classList.remove('burger-visible');
//   }
// });

// // Profile Menu


//   const profileIcon = document.querySelector('.profile-link');
//   const profileMenu = document.querySelector('.profile-menu');
//   let menuDisplay = false;

//   profileIcon.addEventListener('click', (event) => {
//     event.stopPropagation();
//     menuDisplay = !menuDisplay;
//     profileMenu.classList.toggle('profile-menu-visible');
//   });

//   document.addEventListener('click', (event) => {
//     if (menuDisplay) {
//       const target = event.target;
//       if (!profileMenu.contains(target) && (target !== profileIcon || burgerMenu)) {
//         menuDisplay = false;
//         burgerMenu = false;
//         profileMenu.classList.remove('profile-menu-visible');
//         nav.classList.remove('nav-visible');
//         burger.classList.remove('burger-visible');
//       }
//     }
//   });

const burger = document.querySelector('.burger-button');
const nav = document.querySelector('.nav');
const body = document.querySelector('.body');
const navLinks = document.querySelectorAll('.nav-link');
let burgerMenu = false;
let menuDisplay = false;
let modalReg = false;

burger.addEventListener('click', () => {
  burgerMenu = !burgerMenu;
  nav.classList.toggle('nav-visible');
  burger.classList.toggle('burger-visible');

  // Закрываем профайл-меню при открытии бургер-меню
  menuDisplay = false;
  profileMenu.classList.remove('profile-menu-visible');
});

navLinks.forEach(link => {
  link.addEventListener('click', function() {
    nav.classList.remove('nav-visible');
    burger.classList.remove('burger-visible');
  });
});

body.addEventListener('click', function(event) {
  if (event.target !== nav && event.target !== burger) {
    nav.classList.remove('nav-visible');
    burger.classList.remove('burger-visible');
  }
});

// Profile Menu

const profileIcon = document.querySelector('.profile-link');
const profileMenu = document.querySelector('.profile-menu');

profileIcon.addEventListener('click', (event) => {
  event.stopPropagation();
  menuDisplay = !menuDisplay;
  profileMenu.classList.toggle('profile-menu-visible');

  // Закрываем бургер-меню при открытии профайл-меню
  burgerMenu = false;
  nav.classList.remove('nav-visible');
  burger.classList.remove('burger-visible');
});

document.addEventListener('click', (event) => {
  if (menuDisplay) {
    const target = event.target;
    if (!profileMenu.contains(target) && target !== profileIcon) {
      menuDisplay = false;
      profileMenu.classList.remove('profile-menu-visible');
    }
  }
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

// Carousel

const list = document.querySelector('.carousel-list'); //ul с картинками
const slides = document.querySelectorAll('.carousel-item'); //дивы с картинками
const leftArrow = document.querySelector('.carousel-arrow-left'); //левая стрелка
const rightArrow = document.querySelector('.carousel-arrow-right'); // правая стрелка
const dotControls = document.querySelector('.controls'); // обертка с дивами в которых точки
const controls = document.querySelectorAll('.control'); // дивы с точками
const dots = document.querySelectorAll('.dot'); //точки (это спаны)
const actControl = document.querySelector('.active-control'); //активная точка-спан


// это функция которая листает слайдер по клику на кнопки пагинации
function dotClickMove () {

  controls.forEach((control, index)=>{ //перебираю дивы с точками
    control.addEventListener('click', (e)=> { //слушаю клик по диву с точкой
      let targetIndex = index;

      dots.forEach((dot, index) => { // теперь перебираю точки и меняю активный класс
        if (index === targetIndex) {
          dot.classList.add('active-dot');
        } else {
          dot.classList.remove('active-dot');
        }
      });

      let distance = 475 * index; // это вычисляем отступ насколько надо подвинуть список
      list.style.transform = `translateX(${-distance}px)` // меняю параметр translateX в css
    })
  });
}


function arrowClickMove() {
  leftArrow.addEventListener('click', () => {
    moveSlides('left');
  });

  rightArrow.addEventListener('click', () => {
    moveSlides('right');
  });
}

function moveSlides(direction) {
  let i = null;

  // // Обнуление свойств стрелок крайнего положения
  // leftArrow.style.opacity = 1;
  // rightArrow.style.opacity = 1;
  // leftArrow.style.cursor = 'pointer';
  // rightArrow.style.cursor = 'pointer';

  dots.forEach((dot, index) => {
    if (dot.classList.contains('active-dot')) {
      i = index;
    }
  });

  const distance = 475;
  if (i !== null && (direction === 'left' && i !== 0) || (direction === 'right' && i !== dots.length - 1)) {
    i += direction === 'left' ? -1 : 1;
    list.style.transform = `translateX(${-distance * i}px)`;
  }
  dots.forEach((dot, index) => {
  dot.classList.remove('active-dot');
  });
  dots[i].classList.add('active-dot');

}

dotClickMove();
arrowClickMove();

    // if (direction === 'left' && i === 0) {
    //   leftArrow.style.opacity = 0.3;
    //   leftArrow.style.cursor='not-allowed';
    // }
    // if (direction === 'right' && i === dots.length - 1) {
    //   rightArrow.style.opacity = 0.3;
    //   rightArrow.style.cursor='not-allowed';
    // }



//   controls.addEventListener('click', () => {
//       console.log(checkCurrentIndex());
//     })



// // это фукнция определяет значения параметра translateX для list (ul cо слайдами)
// function checkListPosition () {
//   const styles = window.getComputedStyle(list);
//   const transformValue = styles.getPropertyValue('transform');
//   const matrix = new DOMMatrix(transformValue);
//   // console.log(matrix);
//   const currentTranslateX = matrix.m41;
//   // console.log(currentTranslateX);
//   return currentTranslateX;
// }


// function arrowClickMove () {
//   leftArrow.addEventListener('click', () =>{
//     let position = checkListPosition();
//     console.log(position);
//     let checkPosition = position % 475;
//     if (position !== 0 && checkPosition === 0 ) {
//     list.style.transform = `translateX(${position + 475}px)`;
//   }


//   });
//   rightArrow.addEventListener('click', () => {
//     let position = checkListPosition();
//     console.log(position);
//     let checkPosition = position % 475;
//     if (position !== -1900 && checkPosition === 0) {
//     list.style.transform = `translateX(${position - 475}px)`;
//   }
// });
// }


// arrowClickMove()
// checkListPosition ()



//  когда я кликаю на правую стрелку, слайдер сдвигается на один слайд вправо
//  если это не крайнее значение

//  когда я кликаю на левую стрелку, слайдер сдвигается на один слайд влево
//  если это не крайнее значение

// когда я кликаю на кнопку пагинации, слайдер показывает соответствующую картинку по счету


// Modal REGISTER

const modalButtonsRegister = document.querySelectorAll('[data-modal-btn="register"]'); // все кнопки которые открывают модальное окно REGISTER


// console.log(modalButtonsRegister)

modalButtonsRegister.forEach((e)=>{
  e.addEventListener('click', function() {

    const modalRegister = this.dataset.modalBtn;
    // console.log(modalRegister)

    const modalWidowRegister = document.querySelector('#' + modalRegister);
    // console.log(modalWidowRegister);

    modalReg = !modalReg;
    modalWidowRegister.classList.remove('hide');

    if (menuDisplay) {
      menuDisplay = false;
      profileMenu.classList.remove('profile-menu-visible');
    }
  });
});



  const modalButtonsClose = document.querySelectorAll('[data-close-modal]'); // все кнопки которые закрывают модалки
  // console.log(modalButtonsClose)
  modalButtonsClose.forEach((e)=>{
  e.addEventListener('click', function (){
    const currentModal = this.closest('[data-modal-window]');
    // console.log(currentModal)
    // if (currentModal.dataset.register){
    //   modalReg = false;
    // }
    modalReg = false; // как понять какая именно модалка this?
    // console.log(modalReg)
    currentModal.classList.add('hide');
  })
})


// Local Storage Study

// //Добавляем или изменяем значение:
// localStorage.setItem('myKey', 'myValue'); //теперь у вас в localStorage хранится ключ "myKey" cо значением "myValue"

// //Выводим его в консоль:
// var localValue = localStorage.getItem('myKey');
// console.log(localValue); //"myValue"

// // //удаляем:
// localStorage.removeItem("myKey");

// // //очищаем все хранилище
// localStorage.clear()

// // То же самое, только с квадратными скобками:

// localStorage["Ключ"] = "Значение" //установка значения
// localStorage["Ключ"] // Получение значения
// delete localStorage["Ключ"] // Удаление значения

// localStorage.user = JSON.stringify({name: "John"});

// let user = JSON.parse( localStorage.user );
// alert( user.name ); // John

// Modal register

const registerForm = document.getElementById('register');
const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const emailInput = document.getElementById('reg-email');
const passwordReg = document.getElementById('reg-pass');
let counter = JSON.parse(localStorage.getItem('counter')) || 0;

function generateUniqUserId () {
  return counter++;
}

function createNewUser () {
  let existingUsers = JSON.parse(localStorage.getItem('allLibraryUsers')) || [];
  const userUniqCounter = generateUniqUserId ();

  let newLibraryUser = {
    counter: userUniqCounter,
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    email: emailInput.value,
    password: passwordReg.value,
  };

  existingUsers.push(newLibraryUser);

  localStorage.setItem('allLibraryUsers', JSON.stringify(existingUsers));

}

registerForm.addEventListener('submit', (e)=>{
  e.preventDefault();

  createNewUser ();

  if (modalReg) {
    modalReg = false;
    registerForm.classList.add('hide');
  }

  location.reload();
});

// function changeAvatar () {

//   const userDataJSON = localStorage.getItem('userData');

//   if (userDataJSON) {
//   const userData = JSON.parse(userDataJSON);

//   const userLetters = userData.firstName[0] + userData.lastName[0];
//   console.log(userLetters)
//   }

//   }







