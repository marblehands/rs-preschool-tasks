import music from './playlists.js'

let isPlay = false
const soundControl = document.querySelector('.control-sound')
const nextControl = document.querySelector('.control-next')
const previousControl = document.querySelector('.control-previous')

const pills = Array.from(document.getElementsByName('genre'))
// console.log(pills)
const playlistWrapper = document.querySelector('.playlist-wrapper')
// console.log(playlistWrapper)
let currentPlaylist = getCurrentPlaylist ()
let currentSongIndex = 0
// console.log(currentPlaylist)
const audio = new Audio();

pills.forEach((pill) => {
  pill.addEventListener('click', function () {
    playlistWrapper.innerHTML = '';
    currentPlaylist = getCurrentPlaylist();
    loadPlaylist ()
    console.log('test')
  })
})

soundControl.addEventListener('click', function () {
  playAudio(currentSongIndex)
})
audio.addEventListener('ended', playNextSong);

function playControlToggle () {
  if (!isPlay) {
    soundControl.classList.add('pause')
  } else {
    soundControl.classList.remove('pause')
  }
}

function playAudio(index) {
  if (index < currentPlaylist.length) {
    if (!isPlay && audio.paused) {
      playControlToggle();
      const song = currentPlaylist[index]
      audio.src = song.url
      audio.play()
      isPlay = true
    } else {
      playControlToggle();
      audio.pause();
      isPlay = false;
    }
  }
}

function playNextSong() {
  if (isPlay) {
    currentSongIndex++;
    if (currentSongIndex < currentPlaylist.length) {
      audio.src = currentPlaylist[currentSongIndex].url;
      audio.play();
    } else {
      playControlToggle();
      audio.pause();
      isPlay = false;
    }
  }
}

function playPrevSong() {
  if (isPlay) {
    currentSongIndex--;
    if (currentSongIndex < currentPlaylist.length && currentSongIndex >= 0) {
      audio.src = currentPlaylist[currentSongIndex].url;
      audio.play();
    } else {
      playControlToggle();
      audio.pause();
      isPlay = false;
    }
  }
}


nextControl.addEventListener('click', playNextSong)
previousControl.addEventListener('click', playPrevSong)







// Find current playlist
function getCurrentPlaylist () {
  const pillChecked = pills.filter(pill => pill.checked)
  console.log(pillChecked)
  const playlist = pillChecked[0].id
  return music[playlist]
}

//Paste playlist data
function loadPlaylist () {
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

loadPlaylist ()





