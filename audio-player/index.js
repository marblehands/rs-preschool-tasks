import music from './playlists.js'

let isPlay = false
const soundControl = document.querySelector('.control-sound')
const pills = Array.from(document.getElementsByName('genre'))
const playlistWrapper = document.querySelector('.playlist-wrapper')
let currentPlaylist = getCurrentPlaylist ()
const audio = new Audio();

function playAudio() {
  if (!isPlay) {
    audio.src = currentPlaylist[0].url
    audio.currentTime = 0
    audio.play()
    isPlay = true
    soundControl.classList.add('pause')
  } else if (isPlay) {
    audio.pause()
    isPlay = false
    soundControl.classList.remove('pause')
  }
}

soundControl.addEventListener('click', function () {
  playAudio()
})

pills.forEach((pill) => {
  pill.addEventListener('click', function () {
    playlistWrapper.innerHTML = '';
    getCurrentPlaylist ()
    loadPlaylist ()
  })
})

// Find current playlist
function getCurrentPlaylist () {
  const pillChecked = pills.filter(pill => pill.checked)
  const playlist = pillChecked[0].id

  return music[playlist]
}

//Paste playlist data
function loadPlaylist () {

  if (currentPlaylist) {
    currentPlaylist.forEach(song => {
      const songItemLayout = `
          <div class="song-item-wrapper">
            <div class="song-item-cover-wrapper">
              <img src="${song.cover}" alt="${song.band} - ${song.title} Song Cover" class="song-item-cover-img">
            </div>
            <div class="song-item-info">
              <div class="song-item-title">${song.title}</div>
              <div class="song-item-author">${song.band}</div>
            </div>
            <div class="song-item-controls">
              <span class="song-item-duration">${song.duration}</span>
              <button class="control song-item-control"><img src="assets/svg/play-small-sign.svg" alt="" class="control-img"></button>
            </div>
          </div>`
      playlistWrapper.insertAdjacentHTML('beforeend', songItemLayout)
    });

  }
}

loadPlaylist ()





