let isPlay = false

const soundControl = document.querySelector('.control-sound')

soundControl.addEventListener('click', function () {
  if (!isPlay) {
    soundControl.classList.add('pause')
  } else {
    isPlay = false
    soundControl.classList.remove('pause')
  }
})