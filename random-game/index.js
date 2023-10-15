console.log(`
WARNING!!! КОГДА ТЫ НАЖМЕШЬ НА КНОПКУ START - ЗАИГРАЕТ МУЗЫКА WARNING!!!
\n
Привет, мой Ревьюер :)
Если у тебя есть комментарии, любые советы или вопросы по моей работе, пожалуйста напиши мне RS дискорде: Ania @marblehands Спасибо за твою проверку!
\n
Моя оценка после самопроверки: 70 баллов
\n
1. Вёрстка +10
    * ✅ реализован интерфейс игры +5
    * ✅ Десктопная версию от 1024px и выше. Мобильная версия от 600px до 1024px. Реализованы мобильные контролы.
    * ✅ В футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
2. ✅ Логика игры. Ходы, перемещения фигур, другие действия игрока подчиняются определённым свойственным игре правилам: змейка кушает еду и растет, нельзя кушать самого себя и выходить за пределы поля +10
3. ✅ Реализовано завершение игры при достижении игровой цели +10
Игра завершается если змейка выходит за пределы игрового поля или ест саму себя. Цель игры набрать как можно больше очков.
4. ✅ По окончанию игры выводится её результат: набранное количество очков. +10
5. ✅ В окне Results выводится таблица Top Results. Эта таблица представляет собой 10 лучших результатов за все время. Дубликаты результатов не выводятся, так как игры не персонифицированы. Результат 0 выводится один раз, если нет результатов лучше. Все результаты всех игры хранятся в localstorage в массиве AllGamesresults +10
6. ✅ Анимации или звуки, или настройки игры. Баллы начисляются за любой из перечисленных пунктов. В игре добавлен фоновый звуковой ряд и некоторые звуковые эффекты игровых событий. Звук можно отключить по иконке мьюта. Также есть небольшая анимация облаков, которая начинается после старта игры. +10
7. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
    * высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо
В игре реализован кастомный дизайн. Немного мрачноватый, но это в честь приближающегося Хэллуина. 👻
`);

//game controls and modals
const startBtn = document.getElementById('start')
const gameOverModal = document.querySelector('.game-over-modal')

//mobile controls
const leftBtn = document.querySelector('.arrow-left')
const rightBtn = document.querySelector('.arrow-right')
const upBtn = document.querySelector('.arrow-up')
const downBtn = document.querySelector('.arrow-down')

//audio related variables
const audio = new Audio()
const playlist = ['assets/audio/spooky-halloween.mp3', 'assets/audio/spooky-scenes.mp3', 'assets/audio/let-the-mystery-unfold.mp3', 'assets/audio/kim-lightyear-lullaby.mp3']
let currentSong = 0
audio.src = playlist[currentSong]
audio.volume = 0.2

//start the game
startBtn.addEventListener('click', () =>{
  const firstScreen = document.querySelector('.first-screen-modal')
  const scoreInfo = document.querySelector('.wrapper-score')
  firstScreen.classList.add('hide')
  scoreInfo.classList.remove('hide')
  audio.play()
  animatePage ()

  leftBtn.addEventListener('click', () => {
      setDirection(directions.LEFT)
  })

  rightBtn.addEventListener('click', () => {
      setDirection(directions.RIGHT)
  })

  upBtn.addEventListener('click', () => {
      setDirection(directions.UP)
  })

  downBtn.addEventListener('click', () => {
      setDirection(directions.DOWN)
  })
})

//canvas
const canvas = document.getElementById('board-canvas')
const context = canvas.getContext('2d')
const boardWrapper = document.querySelector('.board-game')

//variables with colors
const boardColour = '#0A1A1B'
const snakeHeadColour = '#AEF020'
const snakeBodyColour = '#2A686D'
const foodColour = '#00FFC2'


//canvas size
let boardWidth = updateCanvasWidth()
let boardHeight = boardWidth
let moduleSize = 30
// let ratio = boardWidth / moduleSize
let ratio = 20

//variables for game
const loopFrequency = 1000/8
let gameUpdate
let game = false

//variable for score
const currentScoreNum = document.querySelector('.current-score-number')
const highScoreNum = document.querySelector('.high-score-number')


//get canvas size
updateCanvasWidth()
window.addEventListener('resize', updateCanvasWidth)

//update canvas width
function updateCanvasWidth() {
  var boardSize = boardWrapper.getBoundingClientRect().width
  canvas.style.width = boardSize + 'px'
  canvas.style.height = boardSize + 'px'

  const screenRatio = window.devicePixelRatio
  canvas.width = boardSize * screenRatio
  canvas.height = boardSize * screenRatio

  context.scale(screenRatio, screenRatio)

  return canvas.width
}

//variables for snake
let snake = [
  {x : 8, y : 10}, //head
  {x : 7, y : 10}, //body
  {x : 6, y : 10}, //tail
]
const defaultSnakeLength = snake.length

//food
let food = generateRandomFood ()

//generate random coordinates for food
function generateRandomFood () {
  // let boardWidth = updateCanvasWidth()
  if (boardWidth > 600) {
    boardWidth /= 2
  }
  // console.log(boardWidth)
  let ratio = boardWidth / moduleSize
  // console.log(ratio)
  let food = {
    x : Math.floor(Math.random() * ratio),
    y : Math.floor(Math.random() * ratio),
  }

  while (snake.some((segment) => (segment.x === food.x && segment.y === food.y) || (food.x >= 20 && food.y >= 20))) {
    food = {
      x : Math.floor(Math.random() * ratio),
      y : Math.floor(Math.random() * ratio),
    }
  }
  // console.log(snake)
  // console.log(food)
  return food
}

function createFood () {
  drawModule(food.x, food.y, foodColour)
  // console.log('success')
}

//variables for direction
let currentDirection = ''
let directionsSequence = [];
const directions = {
  RIGHT: 'ArrowRight',
  LEFT: 'ArrowLeft',
  DOWN: 'ArrowDown',
  UP: 'ArrowUp'
}

document.addEventListener('keyup', setDirection)
function setDirection (event) {
  const nextDirection = event.key || event
  // console.log(nextDirection)
  let previousDirection = currentDirection

  if (
  (nextDirection === directions.LEFT &&
    previousDirection !== directions.RIGHT) ||
  (nextDirection === directions.RIGHT &&
    previousDirection !== directions.LEFT) ||
  (nextDirection === directions.DOWN &&
    previousDirection !== directions.UP) ||
  (nextDirection === directions.UP &&
    previousDirection !== directions.DOWN)
  ) {
    if(!game) {
      game = true
      gameUpdate = setInterval(infiniteLoad, loopFrequency)
    }
    directionsSequence.push(nextDirection)
    // console.log(directionsSequence)
  }
}


//create Game Board
function createBoardGame () {
  context.fillStyle = boardColour
  context.fillRect(0, 0, boardWidth, boardHeight)
  for (let k = 29; k < 570; k += 30) {
        for (let i = 29; i < 570; i += 30) {
          context.fillStyle = '#1F2E2B'
          context.fillRect(k, i, 2, 2)
        }
      }
}

//create one square module on canvas
function drawModule (x, y, color) {
  context.fillStyle = color
  context.fillRect(
    x * moduleSize,
    y * moduleSize,
    moduleSize,
    moduleSize)

  // context.strokeStyle = boardColour
  // context.strokeRect(
  //   x * moduleSize,
  //   y * moduleSize,
  //   moduleSize,
  //   moduleSize
  // )
}

//create snake on canvas
function createSnake () {
  snake.forEach((segment, index) => {
    const colour = index === 0 ? snakeHeadColour : snakeBodyColour
    drawModule(segment.x, segment.y, colour)
  })
}

//movement of snake
function runSnake () {
  if(!game) return;
  //get head coordinates
  const headPosition = { ...snake[0] }
  // console.log(headPosition)

  if (directionsSequence.length) {
    currentDirection = directionsSequence.shift()
  }

  //change head position
  switch(currentDirection) {
    case directions.RIGHT:
      headPosition.x += 1;
      break;
    case directions.LEFT:
      headPosition.x -= 1;
      break;
    case directions.UP:
      headPosition.y -= 1;
      break;
    case directions.DOWN:
      headPosition.y += 1;
      break;
  }

if (isFoodEaten()) {
  food = generateRandomFood ()
} else {
  //remove last element in snake array
  snake.pop()
}

//add new head to new snake
snake.unshift(headPosition)
}

function isFoodEaten () {
  const head = snake[0]
  return head.x === food.x && head.y === food.y
}

//score update
let currentScore = 0
let highScore = highScoreCount ()
function updateScore () {
  currentScore = snake.length - defaultSnakeLength
  currentScoreNum.innerHTML = `/${currentScore}`
}

infiniteLoad ()

//updating the board infinitely
function infiniteLoad () {
  // console.log('test')

  createBoardGame()
  createSnake()
  createFood ()
  runSnake()
  updateScore ()
  highScoreCount ()

  if (goOut() || eatSelf()) {
    clearInterval(gameUpdate)
    setTimeout(endOfGame, 800)
    // console.log('test')
    // console.log(ratio)
  }
}

function goOut () {
  const head = snake[0]
  // console.log(head.y, ratio)
  console.log(ratio)
  return (head.x >= ratio || head.x < 0 || head.y >= ratio || head.y < 0)
}

function eatSelf () {
  const newSnake = [ ...snake ]
  const head = newSnake.shift()
  // console.log(newSnake)
  return (
    newSnake.some((segment) => (head.x === segment.x && head.y === segment.y))
    )
}

function endOfGame() {
  game = false
  gameOverModal.classList.remove('hide')
  context.clearRect(0, 0, canvas.width, canvas.height)

  const totalScoreNum = document.querySelector('.total-score-number')
  totalScoreNum.innerHTML =`/${currentScore}`

  // const clouds = document.querySelector('.clouds')
  // clouds.style.animation = ''

  saveResults ()
  highScoreCount ()
}

function saveResults () {
  let allGamesResults = JSON.parse(localStorage.getItem('allGamesResults')) || []
  allGamesResults.push(currentScore)
  localStorage.setItem('allGamesResults', JSON.stringify(allGamesResults))
}

function highScoreCount () {
  let allGamesResults = JSON.parse(localStorage.getItem('allGamesResults')) || []
  if (allGamesResults.length) {
    let highScore = allGamesResults.reduce((accum, score) => {
      return ((score > accum) ? score : accum)
    }, [allGamesResults[0]])
    highScoreNum.innerHTML = `/${highScore}`
    return highScore
  } else {
    let highScore = 0
    highScoreNum.innerHTML = `/${highScore}`
    return highScore
  }
}

// restart the game
const restartBtn = document.getElementById('restart')
restartBtn.addEventListener('click', () => {
  console.log('click')
  startNewGame()
})

function startNewGame () {
  snake = [
    {x : 8, y : 10},
    {x : 7, y : 10},
    {x : 6, y : 10},
  ]

  currentDirection = ''
  directionsSequence = [];

  game = false

  gameOverModal.classList.add('hide')

  infiniteLoad ()
}

//open results table
const gameResultsModal = document.querySelector('.top-score-modal')
const resultsBtn = document.getElementById('results')
resultsBtn.addEventListener('click', () => {
  gameOverModal.classList.add('hide')
  gameResultsModal.classList.remove('hide')
  updateScoreTable ()
})

//close results
const closeBtn = document.getElementById('close')
closeBtn.addEventListener('click', () => {
  gameOverModal.classList.remove('hide')
  gameResultsModal.classList.add('hide')
})

//update score table
function updateScoreTable () {
  const allGamesResults = JSON.parse(localStorage.getItem('allGamesResults')) || []
  allGamesResults.sort((a,b)=> b - a)
  console.log(allGamesResults)
  const allGamesResultsFiltered = [ ...new Set(allGamesResults)]
  console.log(allGamesResultsFiltered)
  const bestScores = allGamesResultsFiltered.slice(0, 10)
  console.log(bestScores)
  const scoreItems = document.querySelectorAll('.score-item')
  scoreItems.forEach((item, index) => {
    if (bestScores[index] !== undefined) {
      const scoreNum = document.createElement('span')
      scoreNum.className = 'score-text'
      item.classList.add('active')
      item.innerHTML = ''
      scoreNum.textContent = bestScores[index]
      item.appendChild(scoreNum)
    }
  })
}

function animatePage () {
  const clouds = document.querySelector('.clouds')
  clouds.style.animation = '100s float infinite linear'

  const batLeft = document.querySelector('.bat-left')
  const batRight = document.querySelector('.bat-right')

  batLeft.style.animation = 'move1 10s infinite alternate'
  batRight.style.animation = 'move2 10s infinite alternate'
}


//audio related functions

audio.addEventListener('ended', playNext)

function playNext () {
  currentSong = (currentSong + 1) % playlist.length
  audio.src = playlist[currentSong]
  audio.play()
}

//mute sound
const volumeControl = document.querySelector('.mute-icon')

volumeControl.addEventListener('click', soundMute)

const currentVolume = audio.volume
function soundMute () {
  if (audio.volume !== 0) {
    volumeControl.src = 'assets/svg/sound-icon.svg'
    audio.volume = 0.0
  } else {
    volumeControl.src = 'assets/svg/mute-icon.svg'
    audio.volume = currentVolume
  }
}