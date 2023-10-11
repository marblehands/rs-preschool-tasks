// //start the game
// const startBtn = document.getElementById('start')

// startBtn.addEventListener('click', () =>{
//   const firstScreen = document.querySelector('.first-screen-modal')
//   const scoreInfo = document.querySelector('.wrapper-score')
//   firstScreen.classList.add('hide')
//   scoreInfo.classList.remove('hide')
// })

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
let ratio = boardWidth / moduleSize

//variables for game
const loopFrequency = 1000/5
let gameUpdate
let game = false

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
  {x : 2, y : 0}, //head
  {x : 1, y : 0}, //body
  {x : 0, y : 0}, //tail
]

//food
let food = generateRandomFood ()

//generate random coordinates for food
function generateRandomFood () {
  let boardWidth = updateCanvasWidth()
  if (boardWidth > 600) {
    boardWidth /= 2
  }
  console.log(boardWidth)
  let ratio = boardWidth / moduleSize
  console.log(ratio)
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
  console.log(snake)
  console.log(food)
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
  console.log(nextDirection)
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
    console.log(directionsSequence)
  }
}


infiniteLoad ()

//updating the board infinitely
function infiniteLoad () {
  // console.log('test')

  createBoardGame()
  createSnake()
  createFood ()
  runSnake()
  // growSnake()
  // updateScore()

  // if (goOut() || eatSelf()) {
  //   clearInterval(gameUpdate)
  //   endOfGame()
  // }
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
  console.log(headPosition)

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

//remove last element in snake array
snake.pop()

//add new head to new snake
snake.unshift(headPosition)

}




