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
let ratio = 40
let moduleSize = boardWidth / ratio

//variables for game
const loopFrequency = 1000/15
let gameUpdate

//variables for snake
let snake = [
  {x : 2, y : 0}, //head
  {x : 1, y : 0}, //body
  {x : 0, y : 0}, //tail
]

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


//updating the board infinitely
function infiniteLoad () {
  console.log('test')

  createBoardGame()
  createSnake()
  // createFood()
  // runSnake()
  // growSnake()
  // updateScore()

  // if (goOut() || eatSelf()) {
  //   clearInterval(gameUpdate)
  //   endOfGame()
  // }
}
gameUpdate = setInterval(infiniteLoad, loopFrequency)

//create Game Board
function createBoardGame () {
  context.fillStyle = boardColour
  context.fillRect(0, 0, boardWidth, boardHeight)
  // for (let k = 0; k < boardWidth - 30; k += 30) {
  //       for (let i = 0; i < boardWidth - 30; i += 30) {
  //         context.fillStyle = '#BFDEE0'
  //         context.fillRect(k, i, 29, 29)
  //       }
  //     }

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

function createSnake () {
  snake.forEach((segment, index) => {
    const colour = index === 0 ? snakeHeadColour : snakeBodyColour
    drawModule(segment.x, segment.y, colour)
  })
}







/////////

// // }
// const canvas = document.getElementById('cvs')
// const context = canvas.getContext('2d')
// const SPEED = 3

// createBoard ()


// function createBoard () {

//   const size = 600;
//   canvas.style.width = size + "px";
//   canvas.style.height = size + "px";

//   const screenRation = window.devicePixelRatio
//   canvas.width = size * screenRation
//   canvas.height = size * screenRation

//   context.scale(screenRation, screenRation);

//   for (let k = 29; k < 570; k += 30) {
//     for (let i = 29; i < 570; i += 30) {
//       context.fillStyle = 'rgba(255, 255, 255, 0.15)'
//       context.fillRect(k, i, 2, 2)
//     }
//   }
// }

// let x = 0,
//     y = 0

// function oneFrameAnimation () {
//   context.clearRect(0, 0, canvas.width, canvas.height)

//   context.fillStyle = '#00FFC2'
//   context.fillRect (x, y, 30, 30)
//   x = x + 30
// }

// setInterval(oneFrameAnimation, 1000 / SPEED)
