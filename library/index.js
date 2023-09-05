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
let activeUser = 0; //это переменная которая мониторит активного юзера
let currentUserData = { }; //это объект активного юзера



// функция которая проверяет есть ли активный юзер и если да то меняет страницу, записывает активного юзера в объект
function activeUserCheck () {
  let existingUsers = JSON.parse(localStorage.getItem('allLibraryUsers'));
  console.log(existingUsers)
  activeUser = parseInt(localStorage.getItem('activeUser')) || 0;
  console.log(activeUser)
  if (activeUser !== 0) {
    let currentUser = existingUsers[activeUser - 1];
    changePage(currentUser);
    openLibraryModal ();
    currentUserData = currentUser;
  }
  return
}

activeUserCheck ();


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
const profileAuthorized = document.querySelector('.profile-link-authorized');
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

profileAuthorized.addEventListener('click', (event) =>{
  event.stopPropagation();
  menuDisplay = !menuDisplay;

  profileMenu.classList.toggle('profile-menu-visible');


  // Закрываем бургер-меню при открытии профайл-меню
  burgerMenu = false;
  nav.classList.remove('nav-visible');
  burger.classList.remove('burger-visible');
})

document.addEventListener('click', (event) => {
  if (menuDisplay) {
    const target = event.target;
    if (!profileMenu.contains(target) && target !== profileIcon) {
      menuDisplay = false;
      profileMenu.classList.remove('profile-menu-visible');
    }
  }
});


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





//  когда я кликаю на правую стрелку, слайдер сдвигается на один слайд вправо
//  если это не крайнее значение

//  когда я кликаю на левую стрелку, слайдер сдвигается на один слайд влево
//  если это не крайнее значение

// когда я кликаю на кнопку пагинации, слайдер показывает соответствующую картинку по счету


// Открываю Modal REGISTER

const modalButtonsRegister = document.querySelectorAll('[data-modal-btn]'); // все кнопки которые открывают модальное окно REGISTER
// console.log(modalButtonsRegister)

modalButtonsRegister.forEach((e)=>{
  e.addEventListener('click', function(el) {
    el.stopPropagation();

    const modalRegister = this.dataset.modalBtn;
    // console.log(modalRegister)

    const modalWidowRegister = document.querySelector('#' + modalRegister);
    // console.log(modalWidowRegister)
    // console.log(modalWidowRegister);
    if (modalWidowRegister !== null){
      modalReg = !modalReg;
    modalWidowRegister.classList.remove('hide');

    }

      // При открытом профайл меню закрываю его
    if (menuDisplay) {
      menuDisplay = false;
      profileMenu.classList.remove('profile-menu-visible');
    }
  });
});


// Закрываю все модалки по всем кнопкам
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

// Закрываю по оверлею
const modalOverlay = document.querySelectorAll('.modal-overlay'); // выбираю все overlay

modalOverlay.forEach((element)=>{ //перебираю overlay
  element.addEventListener('click', (ev)=>{ //вешаю слушатель клика на overlay
    const modalWindow = ev.target.querySelector('.modal-window') //выбираю модалку которую содержит оверлей по к-ому кликнули
    // console.log(modalWindow)
    // console.log(modalReg) //модалка library не закрывается потому что переменная modalReg = false при клике на кнопки Buy надо менять эту переменную

      if (modalReg && //условия закрытия по клику на оверлей
        ev.target === element && // цель клика содержит оверлей
        ev.target !== modalButtonsClose && //цель клика не содержит кнопки по которым закрывается модалка
        !modalWindow.contains(ev.target)) { //цель клика не по модалке
        modalReg = false; //флаг закрытой модалки
        element.classList.add('hide'); //добавляем класс который скрывает оверлей
      }
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

// Эта функция генерит номер юзера (counter) по порядку начиная с 1
function generateUniqUserId () {
  let existingUsers = JSON.parse(localStorage.getItem('allLibraryUsers'));
  if (existingUsers) {
    const lastUser = existingUsers[existingUsers.length - 1];
    let lastUserCounter = lastUser.counter;
    return ++lastUserCounter;
  }
  lastUserCounter = 0;
  return ++lastUserCounter;
}

//Функция меняет аватар и меню, принимает на вход нового юзера
function changePage (user) {
  const userLetters = user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase(); // две буквы имени
  const profileAvatarBtn = document.querySelector('.profile-link') //кнопка с иконкой
  const profileAvatar = document.querySelector('.profile-icon') // иконка svg
  const userProfileAvatar = document.querySelector('.profile-link-authorized') //пустой див для аватарки с буквами
  let userProfileName = document.querySelectorAll('.profile-avatar-name')
  let profileTitle = document.querySelector('.profile-menu-title'); // надпись Profile
  let firstLink = document.querySelector('.login-link') // первая ссылка меню Login -> My Profile
  let secondLink = document.querySelector('.register-link') // вторая ссылка меню register -> Logout
  const cardStr = user.card; //номер карты юзера
  const username = user.firstName + ' ' + user.lastName; // полное имя пользователя нужно для добавления атрибута title

  // Меняю надпись Profile на номер карты
  profileTitle.classList.add('authorized');
  profileTitle.innerHTML  = cardStr;

  // Меняю аватар
  profileAvatar.classList.add('hide');
  profileAvatarBtn.classList.add('hide');
  userProfileAvatar.classList.remove('hide');

  userProfileName.forEach((text)=>{
    text.setAttribute('title', username);
    text.innerHTML = userLetters;
  })
  // userProfileName.setAttribute('title', username);
  // userProfileName.innerHTML = userLetters;

  // Меняю ссылки в меню
  firstLink.classList.remove('login-link');
  firstLink.classList.add('my-profile-link');
  firstLink.dataset.modalBtn = 'profile';
  secondLink.classList.remove('register-link');
  secondLink.classList.add('logout-link');
  delete secondLink.dataset.modalBtn;
  secondLink.dataset.logOut;
  firstLink.innerHTML = 'My Profile';
  secondLink.innerHTML = 'Log Out';

  //Меняю правую секция в Library Cards
  const signupNotAuth = document.querySelector('.signup-not-auth');
  const signupLoggedIn = document.querySelector('.signup-loggedin');
  signupLoggedIn.classList.remove('hide');
  signupNotAuth.classList.add('hide');

  //Меняю форму Your Library card
  const inputs = document.querySelectorAll('[data-user-name], [data-user-number]'); //выбираю два инпута

  inputs.forEach((input)=>{ //перебираю инпуты
    input.value = input.hasAttribute('data-user-name') ? username : cardStr; //закидываю данные юзеры в инпуты
    input.setAttribute('readonly', 'readonly'); // лочу ввод данных в инпуты
    input.style.color = '#bb945f'; //меняю цвет текста в инпутах
    input.style.cursor = 'not-allowed'; //выключаю курсор на инпутах
  });

  //Показываю блок со статистикой
  const stats = document.querySelector('[data-stats]');//Получить блок со статой
  const checkBtn = document.querySelector('[data-check-btn]');//получить кнопку Check card

  checkBtn.classList.add('hide');//Выключить кнопку
  stats.classList.remove('hide');//Включить стату

  //Подставляю данные юзера в модалку MY PROFILE
  const cardNumberSpan = document.querySelector('.card-number'); //получаю надпись номера карты в модалке
  const userNameInModal = document.querySelector('.user-name');
  cardNumberSpan.innerHTML = cardStr; //меняю на номер карты
  userNameInModal.innerHTML = username;

  //Подставляю данные Visits
  const visitsCount = document.querySelectorAll('[data-visits]');
  visitsCount.forEach((e)=>{
    e.innerHTML = user.visits;
  });

  //Подставляю данные Books
  const booksCount = document.querySelectorAll('[data-books]');
  booksCount.forEach((e)=>{
    e.innerHTML = user.books || 0;
  });
}

// 1. беру длину карточки 9 символов
// 2. беру строку с символами 0123456789ABCDEF
// 3. беру пустую строку result
// 4. запускаю цикл от 0 до длины строки с символами
// 5. генерирую рандомный индекс этой строки Math.floor(Math.random() * letters.length)
// 6. записываю в результат рандомный символ из строки

// Функция генерит рандомный номер карты
function readerCardGenerate () {
  const cardLength = 9;
  const symbols = '1234567890ABCDEF';
  let result = '';

  for (let i = 0; i < cardLength; i++) {
    const index = Math.floor(Math.random() * symbols.length);
    result += symbols[index];
  }
  return result;
}

// Функция создания нового пользователя
function createNewUser () {
  let existingUsers = JSON.parse(localStorage.getItem('allLibraryUsers')) || [];
  const userUniqCounter = generateUniqUserId ();
  const userReaderCard = readerCardGenerate ();

  let newLibraryUser = {
    counter: userUniqCounter,
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    email: emailInput.value,
    password: passwordReg.value,
    card: userReaderCard,
    visits: 1,
    books: 0,
    abonement: false,
  };

  existingUsers.push(newLibraryUser);

  localStorage.setItem('allLibraryUsers', JSON.stringify(existingUsers));

  changePage(newLibraryUser);

  activeUser = newLibraryUser.counter;
  localStorage.setItem('activeUser', activeUser);

  location.reload();

}

registerForm.addEventListener('submit', (e)=>{
  e.preventDefault();

  createNewUser ();

  if (modalReg) {
    modalReg = false;
    registerForm.classList.add('hide');
  }

  // location.reload();
});

const logOutBtn = document.querySelector('.logout-link');
if (logOutBtn) {

  logOutBtn.addEventListener('click', (e)=>{
    e.stopPropagation();
    logOut ();
  })
}


function logOut () {
  if (logOutBtn) {
      activeUser = 0;
      localStorage.setItem('activeUser', activeUser);
      currentUserData = { };
      location.reload();
  }
  return
}

// После регистрации вешаю на кнопки Buy открытие модалки с покупкой карты
function openLibraryModal () {
  const allBuyBtn = document.querySelectorAll('.btn-abonement');
  let existingUsers = JSON.parse(localStorage.getItem('allLibraryUsers'));
  if (existingUsers) {
    allBuyBtn.forEach(function(button) {
      button.setAttribute('data-modal-btn', 'library');
    });
  }
}

//Копирование кода в буфер обмена
const cardNumberSpan = document.querySelector('.card-number');
const copyCardNumberIcon = document.querySelector('.copy-icon');

copyCardNumberIcon.addEventListener('click', ()=>{
  const cardNumber = cardNumberSpan.textContent;
  navigator.clipboard.writeText(cardNumber)
  .then(()=>{
    alert('Номер карты скопирован в буфер обмена.');
  })
  .catch(err=>{
    console.error('Ошибка при копировании: ', err);
  })
})

//эта функция проверяет пользователя на входе
const loginForm = document.getElementById('login');

loginForm.addEventListener('submit', (e)=>{
  e.preventDefault();

  login();

  if (modalReg) {
    modalReg = false;
    loginForm.classList.add('hide');
  }
})


function login () {
  const emailOrCardInput = document.getElementById('user-id').value;
  const passwordInput = document.getElementById('login-pass').value;

  let allUsers = JSON.parse(localStorage.getItem('allLibraryUsers')) || [];
  let user = allUsers.find((item)=>{
    return item.email === emailOrCardInput || item.card === emailOrCardInput;
  });

  if (user && user.password === passwordInput) {
    user.visits += 1; //как перезаписвать юзера в локалсторадж?

    const userIndex = user.counter - 1;
    allUsers[userIndex] = user;

    localStorage.setItem('allLibraryUsers', JSON.stringify(allUsers));

    changePage(user); // меняем страницу под юзера
    activeUser = user.counter; //меняем переменную активного юзера на номер бзера
    localStorage.setItem('activeUser', activeUser); //записываем активного юзера в локалсторадж
    location.reload();
    return true;
    cancelFindYourLibraryCardFormChange();
  } else{
    alert('Данные для авторизации неверные. Попробуйте еще раз');
    return false;
  }
}

let timeoutId;

// функиция которая проверяет и ищет пользователя в форме Check readers card
function checkUser () {
  const userNameInput = document.getElementById('name').value || null; //получаю значение инпута с именем
  const userCardInput = document.getElementById('number').value || null; //инпут с номером
  let allUsers = JSON.parse(localStorage.getItem('allLibraryUsers')); //скачиваю пользователей с локалсторадж

  if (userNameInput && userCardInput) { //если инпуты не пустые
    let user = allUsers.find((item)=>{ //ищем пользователя по номеру карты
      return item.card === userCardInput
    });

    //если нашли юзера по карте проверяем по имени + фамилии, просто по имени и по фамилии + имя
  if (user && userNameInput === user.firstName || userNameInput === user.firstName + ' ' + user.lastName || userNameInput === user.lastName + ' ' + user.firstName) {
    findYourLibraryCardFormChange (user, userNameInput, userCardInput);
  }
  }
}

function findYourLibraryCardFormChange (user, userNameInput, userCardInput) {
//показываем статистику этого пользователя
console.log('test')
//Меняю форму Your Library card
const inputs = document.querySelectorAll('[data-user-name], [data-user-number]'); //выбираю два инпута

inputs.forEach((input)=>{ //перебираю инпуты
input.value = input.hasAttribute('data-user-name') ? userNameInput : userCardInput; //закидываю данные юзеры в инпуты
input.setAttribute('readonly', 'readonly'); // лочу ввод данных в инпуты
input.style.color = '#bb945f'; //меняю цвет текста в инпутах //РАЗОБРАТЬСЯ ПОЧЕМУ НЕ КРАСИТ!!!
// input.style.cursor = 'not-allowed'; //выключаю курсор на инпутах
});

//Показываю блок со статистикой
const stats = document.querySelector('[data-stats]');//Получить блок со статой
const checkBtn = document.querySelector('[data-check-btn]');//получить кнопку Check card

checkBtn.classList.add('hide');//Выключить кнопку
stats.classList.remove('hide');//Включить стату

//Подставляю данные Visits
const visitsCount = document.querySelector('[data-visits]');
visitsCount.innerHTML = user.visits;

//Подставляю данные Books
const booksCount = document.querySelector('[data-books]');
booksCount.innerHTML = user.books || 0;

// После 10 секунд отменяю все
timeoutId = setTimeout(function () {
      // скрываю статистику и показаю кнопку
      const inputs = document.querySelectorAll('[data-user-name], [data-user-number]');
      inputs.forEach((input) => {
          input.removeAttribute('readonly');
          input.style.color = '';
          input.value = '';
      });

      const stats = document.querySelector('[data-stats]');
      const checkBtn = document.querySelector('[data-check-btn]');

      checkBtn.classList.remove('hide');
      stats.classList.add('hide');
  }, 10000);
}

function cancelFindYourLibraryCardFormChange() {
  clearTimeout(timeoutId);
}

const checkCardBtn = document.querySelector('[data-check-btn]'); // кнопка Check the card
const cardCheckForm = document.querySelector('.cards') //форма Find your Library card

//слушатель на сабмит формы Find your Library card
cardCheckForm.addEventListener('submit', (e) => {
  e.preventDefault();
  activeUser = parseInt(localStorage.getItem('activeUser')) || 0;
  let allUsers = JSON.parse(localStorage.getItem('allLibraryUsers')) || null;

  if (activeUser === 0 && allUsers) { //если нет активного юзера и есть юзеры в локалсторадж
    checkUser () //проверка и поиск юзера
  }

})














