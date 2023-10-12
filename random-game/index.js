//game controls and modals
const startBtn = document.getElementById('start')
const gameOverModal = document.querySelector('.game-over-modal')

//start the game
startBtn.addEventListener('click', () =>{
  const firstScreen = document.querySelector('.first-screen-modal')
  const scoreInfo = document.querySelector('.wrapper-score')
  firstScreen.classList.add('hide')
  scoreInfo.classList.remove('hide')
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
const loopFrequency = 1000/5
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
  const nextDirection = event.key
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
    endOfGame()
    // console.log('test')
    // console.log(ratio)
  }
}

function goOut () {
  const head = snake[0]
  // console.log(head.y, ratio)
  console.log(ratio)
  return (head.x >= ratio + 1 || head.x < -1 || head.y >= ratio + 1 || head.y < -1)
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
  const lastTenGamesResults = allGamesResults.slice(-10).reverse()
  const scoreItems = document.querySelectorAll('.score-item')
  scoreItems.forEach((item, index) => {
    if (lastTenGamesResults[index] !== undefined) {
      const scoreNum = document.createElement('span')
      scoreNum.className = 'score-text'
      item.classList.add('active')
      item.innerHTML = ''
      scoreNum.textContent = lastTenGamesResults[index]
      item.appendChild(scoreNum)
    }
  })
}